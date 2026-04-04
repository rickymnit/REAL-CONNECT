"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { publicApi } from "@/lib/api";
import { Mail, Check, Loader2 } from "lucide-react";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().optional(),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      await publicApi.subscribe(data);
      setStatus("success");
      reset();
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.response?.data?.detail || "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 p-4 bg-green-500/20 rounded-lg">
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
          <Check size={16} className="text-white" />
        </div>
        <p className="text-green-400 text-sm">
          Thank you for subscribing! You&apos;ll receive our updates soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1 relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Subscribing...
          </>
        ) : (
          "Subscribe"
        )}
      </button>
      {errors.email && (
        <p className="text-red-400 text-sm sm:absolute sm:-bottom-6 sm:left-0">{errors.email.message}</p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-sm sm:absolute sm:-bottom-6 sm:left-0">{errorMessage}</p>
      )}
    </form>
  );
}
