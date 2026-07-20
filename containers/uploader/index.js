import * as S from "./styles";
import dynamic from "next/dynamic";
import { Fragment, useState, useEffect, useRef, useMemo } from "react";

import axios from "axios";

import Papa from "papaparse";

const SAMPLE = {
  Timestamp: "26/06/2023 14:41:56",
  "Student Name": "Xiaochu Dai (Daisy)",
  "Project Name": "Re-encounter",
  "Project Abstract (Max. 100 Characters)": "Re-encounter traces the Hardy Tree and people's companionship, creating an immersive poetic space.",
  "Project Image (PNG)": "re-encounter.png",
  "Your RCA 2023 College-Wide Website Slug (i.e., jeanyoon-choi) READ THE DESCRIPTION BELOW": "xiaochu-dai",
  "Choose the most relevant keyword (Max 3 keywords)": "Poetic, Human-Nature Interaction, Emotional",
};

export default function Screen() {
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          console.log(results.data);
          results.data.forEach((el) => {
            projectUpload(el);
            // eventUpload(el);
          });
        },
      });
    }
  }, [file]);

  async function projectUpload(project) {
    let parsedProject = {
      name: project["Project Name"],
      studentName: project["Student Name"],
      abstract: project["Project Abstract (Max. 100 Characters)"],
      imgURL: project["Project Image (PNG)"],
      slug: project["Your RCA 2023 College-Wide Website Slug (i.e., jeanyoon-choi) READ THE DESCRIPTION BELOW"],
      keywordsArray: project["Choose the most relevant keyword (Max 3 keywords)"].split(", "),
    };

    console.log(parsedProject);

    try {
      await axios.post("/api/prisma/upload-project", parsedProject);
      console.log(project, "uploaded");
    } catch (e) {
      console.log(e);
    }
  }

  //name, studentName, date, endDate, abstract, imgURL, slug
  async function eventUpload(event) {
    //merge start date and time in date-time format
    let startTime = event["Event Start Time"].split(":");
    let endTime = event["Event End Time"].split(":");
    let startDate = event["Event Start Date"].split("/");
    let startDateTime = new Date(startDate[2], startDate[1] - 1, startDate[0], startTime[0], startTime[1], startTime[2]);
    let endDateTime = new Date(startDate[2], startDate[1] - 1, startDate[0], endTime[0], endTime[1], endTime[2]);
    //is startdatetime datetime obj

    let parsedEvent = {
      name: event["Event Name"],
      studentName: event["Performer Name"],
      date: startDateTime,
      endDate: endDateTime,
      description: event["Event Strapline (Max. 100 Characters)"],
      imgURL: event["Event Image (PNG, READ THE DESCRIPTION)"],
      slug: event["Your RCA 2023 College-Wide Website Slug (i.e., jeanyoon-choi) READ THE DESCRIPTION BELOW"],
    };
    console.log(parsedEvent);

    try {
      await axios.post("/api/prisma/upload-event", parsedEvent);
      console.log(event, "uploaded");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
    </>
  );
}
