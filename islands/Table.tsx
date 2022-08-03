/** @jsx h */

import { h } from "preact";
import { useState } from "preact/hooks";
import { Handlers } from "$fresh/server.ts";
import { PageProps } from "$fresh/runtime.ts";
import { tw } from "@twind";
import { Course, findAllCourses, sortCourse } from "@sort";

export default function CourseTable({ data }: PageProps<Course[] | null>) {
  if (!data) {
    return (
      <div>
        <p> oops! no data found </p>
      </div>
    );
  }

  const [tblData, setTblData] = useState(data);
  const [semesterFlag, setSemesterFlag] = useState(0);

  const semester = () => {
    if (semesterFlag === 0) {
      const found = data.filter(element => element.sem === "前期");
      setTblData(found);
      setSemesterFlag(1);
    } else if (semesterFlag === 1) {
      const found = data.filter(element => element.sem === "後期");
      setTblData(found);
      setSemesterFlag(2);
    } else if (semesterFlag === 2) {
      setTblData(data);
      setSemesterFlag(0);
    }
  }
  
  const findAll = () => {
    semester();
    setTblData(tblData);
  }
  
  const findph = () => {
    semester();
    const found = tblData.filter(element => element.id.slice(0,2) === "62");
    setTblData(found);
  }

  const findla = () => {
    semester();
    const found = tblData.filter(element => element.id.slice(0,2) !== "62");
    setTblData(found);
  }
  
  return (
  <div>
    <div>
      <button onClick={findAll}>
        ぜんぶ
      </button>
      <button onClick={findla}>
        ぱんきょー 
      </button>
      <button onClick={findph}>
        ぶつり    
      </button>
    </div>
    <div>
      <button onClick={semester}>
        前期後期切り替え
      </button>
    </div>
    <table>
      <thead>
        <tr>
          <th>
            name
          </th>
          <th>
            lecturers
          </th>
          <th>
            day 
          </th>
          <th>
            hour
          </th>
        </tr>
      </thead>
      <tbody>
      {tblData.map((course) => (
      <tr>
        <td key={course.id} class={tw("px-6")}>
          <h3>{course.name}</h3>
        </td>
        <td class={tw("px-6")}>
          <p>{course.instructor}</p>
        </td>
        <td class={tw("px-6")}>
          <p>{course.day}</p>
        </td>
        <td class={tw("px-6")}>
          <p>{course.hour}</p>
        </td>
      </tr>
      ))}
      </tbody>
    </table>
  </div>
  );
}

