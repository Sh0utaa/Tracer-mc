"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CitiesInput } from "@/components/form/CitiesInput";
import { GroupInput } from "@/components/form/GroupInput";
// import { ProblemRadioInput } from "@/components/form/ProblemRadioInput";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  city: z.string().min(1, { message: "Please select a city" }),
  group: z.string().min(1),
  problem: z.string().min(1),
  action: z.string(),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      group: "1A",
      problem: "W",
      action: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.action === "events") {
      try {
        const response = await fetch("/api/mc-table", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        const eventId = result.id;
        router.push(
          `https://tracer-mc.up.railway.app/?eventId=${eventId}&group=${values.group}`,
        );
      } catch (error) {
        console.error("Error submitting event:", error);
      }
    } else if (values.action === "detector") {
      router.push("https://atlas-viewer.web.cern.ch");
    }
  };

  return (
    <main className="flex w-screen flex-col items-center justify-center overflow-x-hidden px-4 sm:h-screen md:px-0">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        {/* Desktop version (≥768px) */}
        <div className="hidden items-center justify-center gap-12 md:flex">
          <Image src="/images/ippog-logo.png" width={150} height={150} alt="ippog logo" />
          <h1 className="text-center text-2xl font-bold capitalize text-[#063970] md:text-4xl">
            INTERNATIONAL MASTERCLASSES
          </h1>
          <Image src="/images/atlas-logo.png" width={200} height={200} alt="atlas logo" />
        </div>

        {/* Mobile version (<768px) */}
        <div className="flex flex-col items-center justify-center gap-4 md:hidden">
          <h1 className="mt-12 text-center text-2xl font-bold capitalize text-[#063970] md:mt-0">
            INTERNATIONAL MASTERCLASSES
          </h1>

          <div className="flex items-center justify-center gap-12 md:hidden">
            <Image src="/images/atlas-logo.png" width={150} height={150} alt="atlas logo" />
            <Image src="/images/ippog-logo.png" width={100} height={100} alt="ippog logo" />
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => onSubmit(values))}
            className="flex flex-col gap-4 md:flex md:gap-10"
          >
            <input type="hidden" {...form.register("action")} />
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CitiesInput value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage className="absolute" />
                  </FormItem>
                )}
              />
              <div className="flex flex-row items-center gap-3">
                <FormField
                  control={form.control}
                  name="group"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <GroupInput value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="problem"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ProblemRadioInput value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>
            </div>
            <div className="mt-0 flex w-full flex-col items-center justify-center gap-3 sm:mt-6 md:flex-row">
              <button type="submit" onClick={() => form.setValue("action", "events")}>
                <Image
                  className="h-[200px] w-[280px] border-4 border-gray-500 bg-white hover:border-[#ec6d6d] md:h-[235px] md:h-[300px] md:w-[315px] md:w-[380px]"
                  src="/images/tracer_evd_events.png"
                  width={380}
                  height={300}
                  alt="events display"
                />
              </button>
              <button type="submit" onClick={() => form.setValue("action", "detector")}>
                <Image
                  className="h-[200px] w-[280px] border-4 border-gray-500 bg-white hover:border-[#ec6d6d] md:h-[235px] md:h-[300px] md:w-[315px] md:w-[380px]"
                  src="/images/tracer_evd_detector.png"
                  width={380}
                  height={300}
                  alt="detector display"
                />
              </button>
            </div>
          </form>
        </Form>
        <Image
          className="p-3"
          src="/images/tracer-logo.png"
          width={120}
          height={120}
          alt="tracer logo"
        />
      </div>
    </main>
  );
}
