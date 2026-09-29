"use client";

import { DEMO_BLOGS } from "@/lib/demo-data";
import { Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">
            Blog & Medical Journal CMS
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Publish research articles, dietary guidelines, and adaptogen study breakdowns.
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-1.5" /> Write New Article
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-semibold">
                <th className="pb-3">Title</th>
                <th className="pb-3">Author</th>
                <th className="pb-3">Read Time</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {DEMO_BLOGS.map((b) => (
                <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 font-bold text-foreground line-clamp-1">{b.title}</td>
                  <td className="py-3 text-muted-foreground">{b.author?.name}</td>
                  <td className="py-3 text-muted-foreground">{b.readTimeMin} mins</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800">
                      PUBLISHED
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-primary hover:underline font-semibold text-xs">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
