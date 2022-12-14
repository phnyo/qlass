/** @jsx h */

import { h } from "preact"; 
import { tw } from "@twind";
import CourseTable from "../islands/Table.tsx";
import { Course, findAllCourses, sortCourses } from "@sort";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers<Course[] | null> = {
  async GET(_, ctx) {
    const courses: Course[] = await findAllCourses();
    console.log(courses);

    if (!courses) {
      return ctx.render(null);
    }
    return ctx.render(courses);
  },
};

export default function Home({ data }: PageProps<Course[] | null>) { 
  return (
    <div class={tw("px-6 ph-10")}> 
      <h1 class={tw("ph-4 text-lg")}> 嘘シラバス </h1>
      <section>
      <CourseTable data={data}/>
      </section>
    </div>
  );
}
