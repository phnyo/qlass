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
  const [phFlag, setPhFlag] = useState(false);
  const [isFlag, setIsFlag] = useState(false);
  const [laFlag, setLaFlag] = useState(false);
  
  const getSemester = () => {
    if (semesterFlag === 0) {
      setTblData(data);
    } else if (semesterFlag === 1) {
      const found = data.filter(element => element.sem === "前期");
      setTblData(found);
    } else if (semesterFlag === 2) {
      const found = data.filter(element => element.sem === "後期");
      setTblData(found);
    }
  }

  const changeSemester = () => {
    if (semesterFlag === 0) {
      setSemesterFlag(1);
      const found = data.filter(element => element.sem === "前期");
      setTblData(found);
    } else if (semesterFlag === 1) {
      setSemesterFlag(2);
      const found = data.filter(element => element.sem === "後期");
      setTblData(found);
    } else if (semesterFlag === 2) {
      setSemesterFlag(0);
      const found = data;
      setTblData(found);
    }
  }
  
  const findAll = getSemester;

  const findph = () => {
    if (!phFlag) {
      const found = tblData.filter(element => element.id.slice(0,2) === "62");
      setTblData(found);
      setPhFlag(1); 
    }
    else {
      getSemester();
      setPhFlag(0); 
    }
  }

  const findis = () => {
    if (!isFlag) {
      const found = tblData.filter(element => element.id.slice(0,2) === "63");
      setTblData(found);
      setIsFlag(1); 
    }
    else {
      getSemester();
      setIsFlag(0); 
    }
  }

  const findla = () => {
    if (!laFlag) {
      const found = tblData.filter(element => element.id.slice(0,2) !== "62" && element.id.slice(0,2) !== "63");
      setTblData(found);
      setLaFlag(1);
    }
    else {
      getSemester();
      setLaFlag(0);
    }
  }

  const curDep = () => {
    let retArr: String[] = [];
    if (phFlag) {
      retArr.push("物理");
    }
    if (isFlag) {
      retArr.push("情報科学");
    }
    if (laFlag) {
      retArr.push("一般教養");
    }
    if (!retArr.length) {
      retArr.push("すべて");
    }
    return retArr.reduce((acc: String, val: String) => { acc + val; });
  }

  return (
  <div class={tw("grid py-20 place-items-center bg-white")} >
    <div class={tw("space-x-4")}>
      <button class={tw("px-4 py-1.5 bg-green-700 text-white rounded-md")} onClick={findph}>
        ぶつり    
      </button>
      <button class={tw("px-4 py-1.5 bg-green-700 text-white rounded-md")} onClick={findis}>
        じょうほう
      </button>
      <button class={tw("px-4 py-1.5 bg-green-700 text-white rounded-md")} onClick={findla}>
        ぱんきょー 
      </button>
      <button class={tw("px-4 py-1.5 bg-green-700 text-white rounded-md")} onClick={changeSemester}>
        学期切り替え
      </button>
    </div>
    <div class={tw("py-2")}>
      <p class={tw("float-left px-3")}> 時期:{semesterFlag === 0? "すべて" : (semesterFlag === 1 ? "前期" : "後期") } </p>
      <p class={tw("float-left px-3")}> 対象学科:{curDep()} </p>
    </div>
    <div style="text-align: center;">
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
  </div>
  );
}

