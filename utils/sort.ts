import { readCSVObjects } from "https://deno.land/x/csv/mod.ts";

export interface Course {
  course_id: string;
  name: string; 
  instructor: string;
  day: string;
  hour: string;
}

const f = await Deno.open("./static/test.csv");

const courses: Array<Course> = [];

const readCourses = async () => {
  try {
    for await (const obj of readCSVObjects(f)) {
      const course: Course = {};
      Object.entries(obj).forEach(([key, value]) => {
        if (key !== "hours") {
          course[key] = value;
        } else {
          course['day'] = value[0] + value[1] ;
          course['hour'] = value[2] + value[3] ;
        }
      });
      courses.push(course);
    }
    return courses;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const findAllCourses = async () => {
  try {
    return readCourses();
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const sortCourses = async () => {
  try {
    return courses.sort();
  } catch (e) {
    return [];
  }
}
