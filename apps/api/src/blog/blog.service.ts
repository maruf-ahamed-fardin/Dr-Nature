import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BlogStatus } from "@prisma/client";
import { CreateBlogPostDto, UpdateBlogPostDto, BlogQueryDto } from "./blog.dto";

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: BlogQueryDto) {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);
    const skip = (page - 1) * limit;

    const where: any = { status: BlogStatus.PUBLISHED };

    if (query.tag) {
      where.tags = { some: { tag: { slug: query.tag } } };
    }
    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: "insensitive" } },
        { excerpt: { contains: query.search, mode: "insensitive" } },
      ];
    }

    const [posts, total] = await this.prisma.$transaction([
      this.prisma.blogPost.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: "desc" },
        include: {
          author: { select: { id: true, name: true } },
          tags: { include: { tag: true } },
        },
      }),
      this.prisma.blogPost.count({ where }),
    ]);

    return { data: posts, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findAllAdmin(query: BlogQueryDto) {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 20);
    const skip = (page - 1) * limit;

    const [posts, total] = await this.prisma.$transaction([
      this.prisma.blogPost.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          author: { select: { id: true, name: true } },
          tags: { include: { tag: true } },
        },
      }),
      this.prisma.blogPost.count(),
    ]);

    return { data: posts, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findBySlug(slug: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: { select: { id: true, name: true } },
        tags: { include: { tag: true } },
      },
    });
    if (!post) throw new NotFoundException("Blog post not found");
    return post;
  }

  async findById(id: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, name: true } },
        tags: { include: { tag: true } },
      },
    });
    if (!post) throw new NotFoundException("Blog post not found");
    return post;
  }

  async create(authorId: string, dto: CreateBlogPostDto) {
    const existing = await this.prisma.blogPost.findUnique({ where: { slug: dto.slug } });
    if (existing) throw new ConflictException("Slug already exists");

    const { tags, ...data } = dto;

    return this.prisma.blogPost.create({
      data: {
        ...data,
        authorId,
        publishedAt: dto.status === BlogStatus.PUBLISHED ? new Date() : null,
        tags: tags?.length
          ? {
              create: await Promise.all(
                tags.map(async (tagName) => {
                  const slug = tagName.toLowerCase().replace(/\s+/g, "-");
                  const tag = await this.prisma.blogTag.upsert({
                    where: { slug },
                    create: { name: tagName, slug },
                    update: {},
                  });
                  return { tagId: tag.id };
                })
              ),
            }
          : undefined,
      },
      include: { author: { select: { id: true, name: true } }, tags: { include: { tag: true } } },
    });
  }

  async update(id: string, dto: UpdateBlogPostDto) {
    await this.findById(id);
    const { tags, ...data } = dto;

    return this.prisma.blogPost.update({
      where: { id },
      data: {
        ...data,
        publishedAt:
          dto.status === BlogStatus.PUBLISHED
            ? (await this.findById(id)).publishedAt ?? new Date()
            : undefined,
        tags: tags !== undefined
          ? {
              deleteMany: {},
              create: await Promise.all(
                tags.map(async (tagName) => {
                  const slug = tagName.toLowerCase().replace(/\s+/g, "-");
                  const tag = await this.prisma.blogTag.upsert({
                    where: { slug },
                    create: { name: tagName, slug },
                    update: {},
                  });
                  return { tagId: tag.id };
                })
              ),
            }
          : undefined,
      },
      include: { author: { select: { id: true, name: true } }, tags: { include: { tag: true } } },
    });
  }

  async remove(id: string) {
    await this.findById(id);
    await this.prisma.blogPost.delete({ where: { id } });
    return { message: "Blog post deleted" };
  }

  async findAllTags() {
    return this.prisma.blogTag.findMany({
      include: { _count: { select: { posts: true } } },
      orderBy: { name: "asc" },
    });
  }
}
