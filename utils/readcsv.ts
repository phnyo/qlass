import { readCSVObjects } from "https://deno.land/x/csv/mod.ts";

export interface Hours {
  day: string;
  hour: string;
}

export interface Course {
  course_id: string;
  hours: Hours;
  sem: string;
  name: string; 
  instructor: string;
}

const ph = await Deno.open("./static/ph2022.csv");
const is = await Deno.open("./static/is2022.csv");

const courses: Array<Course> = [];

const days = new Map<string, number>([
  ["月曜", "0"],
  ["火曜", "1"],
  ["水曜", "2"],
  ["木曜", "3"],
  ["金曜", "4"],
  ["土曜", "5"],
]);

const readCourses = async () => {
  try {
    for await (const obj of readCSVObjects(ph)) {
      const course: Course = {};
      console.log(obj);
      Object.entries(obj).forEach(([key, value]) => {
        if (key !== "hour") {
          course[key] = value;
        } else {
          const hours: Hours = {};
          hours['day'] = value[0];
          hours['hour'] = value[1];
          course['hours'] = hours;
          console.log(course);
        }
      });
      courses.push(course);
    }
    
    for await (const obj of readCSVObjects(is)) {
      const course: Course = {};
      console.log(obj);
      Object.entries(obj).forEach(([key, value]) => {
        if (key !== "hour") {
          course[key] = value;
        } else {
          const hours: Hours = {};
          hours['day'] = value[0];
          hours['hour'] = value[1];
          course['hours'] = hours;
          console.log(course);
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
    const sources = readCourses();
    return sources;
  } catch (e) {
    console.error(e);
    return [];
  }
}

