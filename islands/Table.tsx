/** @jsx h */

import { h } from "preact";
import { useState } from "preact/hooks";
import { Handlers } from "$fresh/server.ts";
import { PageProps } from "$fresh/runtime.ts";
import { tw } from "@twind";
import { Course, Hours, findAllCourses } from "@readcsv";

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
  const [weekDay, setWeekDay] = useState("日");
  
  const getSemester = () => {
    if (semesterFlag === 0) {
      setTblData(data);
    } else if (semesterFlag === 1) {
      const found = data.filter(element => element.sem === "前");
      setTblData(found);
    } else if (semesterFlag === 2) {
      const found = data.filter(element => element.sem === "後");
      setTblData(found);
    }
  }

  const changeSemester = () => {
    if (semesterFlag === 0) {
      setSemesterFlag(1);
      const found = data.filter(element => element.sem === "前");
      setTblData(found);
    } else if (semesterFlag === 1) {
      setSemesterFlag(2);
      const found = data.filter(element => element.sem === "後");
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
    return retArr.reduce((acc: string, val: string) => { acc + val; });
  }
  
  const findWeekDay = () => {
    if (weekDay === "日") {
      const found = data;
    } else {
      const found = tblData.filter(element => element.hours.day === weekDay);
    }
    setTblData(found);
  }

  const setMonday = () => {
    const found = tblData.filter(element => element.hours.day === "月");
    setTblData(found);
  }

  const setFstPr = () => {
    const found = tblData.filter(element => element.hours.hour === "1");
    setTblData(found);
  }

  const setScdPr = () => {
    const found = tblData.filter(element => element.hours.hour === "2");
    setTblData(found);
  }

  const setTrdPr = () => {
    const found = tblData.filter(element => element.hours.hour === "3");
    setTblData(found);
  }

  const setFouPr = () => {
    const found = tblData.filter(element => element.hours.hour === "4");
    setTblData(found);
  }

  const setFifPr = () => {
    const found = tblData.filter(element => element.hours.hour === "5");
    setTblData(found);
  }

  return (
  <div class={tw("grid py-20 place-items-center bg-white")} >
    <div class={tw("py-1.5 space-x-4")}>
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
    <div class={tw("py-2 space-x-1.5")}>
      <button class={tw("px-2 py-1.5 bg-green-700 text-white rounded-md")} onClick={setMonday}>
        月
      </button>
      <button class={tw("px-2 py-1.5 bg-green-700 text-white rounded-md")} onClick={findis}>
        火
      </button>
      <button class={tw("px-2 py-1.5 bg-green-700 text-white rounded-md")} onClick={findla}>
        水 
      </button>
      <button class={tw("px-2 py-1.5 bg-green-700 text-white rounded-md")} onClick={changeSemester}>
        木
      </button>
      <button class={tw("px-2 py-1.5 bg-green-700 text-white rounded-md")} onClick={changeSemester}>
        金
      </button>
      <button class={tw("px-2 py-1.5 bg-green-700 text-white rounded-md")} onClick={setFstPr}>
        1限
      </button>
      <button class={tw("px-2 py-1.5 bg-green-700 text-white rounded-md")} onClick={setScdPr}>
        2限
      </button>
      <button class={tw("px-2 py-1.5 bg-green-700 text-white rounded-md")} onClick={setTrdPr}>
        3限 
      </button>
      <button class={tw("px-2 py-1.5 bg-green-700 text-white rounded-md")} onClick={setFouPr}>
        4限
      </button>
      <button class={tw("px-2 py-1.5 bg-green-700 text-white rounded-md")} onClick={setFifPr}>
        5限
      </button>
    </div>
    <div class={tw("py-2")}>
      <p class={tw("float-left px-3")}> 時期:{semesterFlag === 0? "すべて" : (semesterFlag === 1 ? "前期" : "後期") } </p>
      <p class={tw("float-left px-3")}> 対象学科:{curDep()} </p>
      <p class={tw("float-left px-3")}> 時間: </p>
    </div>
    <div style="text-align: center;">
      <table>
        <thead>
          <tr>
            <th>
              講義名
            </th>
            <th>
              時間
            </th>
            <th>
              どこ
            </th>
            <th>
              教員
            </th>
            <th>
              対象学年
            </th>
          </tr>
        </thead>
        <tbody>
        {tblData.map((course) => (
        <tr>
          <td key={course.id} class={tw("px-6")}>
            <h3>{course.name}</h3>
          </td>
          <td class={tw("px-2")}>
            <p>{course.hours.day}曜{course.hours.hour}限({course.sem})</p>
          </td>
          <td class={tw("px-2")}>
            <p>{course.cr}</p>
          </td>
          <td class={tw("px-2")}>
            <p>{course.lec}</p>
          </td>
          <td class={tw("px-6")}>
            <p>{course.grade >= 5 ? "修士" : "学部"}{course.grade >= 5 ? course.grade - 4 : course.grade}年</p>
          </td>
        </tr>
        ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}

