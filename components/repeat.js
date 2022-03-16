import dayjs from "dayjs";
import { supermemo } from "supermemo";
import { API_URL } from "../config/index.js";

function practice(flashcard, grade) {
  const { interval, repetition, efactor } = supermemo(flashcard, grade);
  const dueDate = dayjs(Date.now()).add(interval, "day").toISOString();
  return { ...flashcard, interval, repetition, efactor, dueDate };
}

function formatObject(payload, score) {
  score = Math.round(score);
  Object.keys(payload).map((key) => {
    if (key === "due_date") {
      payload.dueDate = payload[key];
      delete payload[key];
    }
    if (key === "user_id" || key === "id") {
      delete payload[key];
    }
    if (key === "efactor") {
      payload[key] = parseInt(payload[key]);
    }
  });
  return practice(payload, score);
}

export default async function repeat(response, topic, result, userId) {
  let flashcard = {
    front: topic,
    interval: 0,
    repetition: 0,
    efactor: 2.5,
    dueDate: dayjs(Date.now()).toISOString(),
  };

  flashcard = practice(flashcard, Number(result / 2));
  const { front, interval, repetition, efactor, dueDate } = flashcard;
  let { payload } = await response.json();
  if (!Array.isArray(payload) || !payload.length) {
    let efactorRound = Math.round(parseFloat(efactor * 1000) / 1000);
    try {
      const response = await fetch(`${API_URL}/repeat/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          front: front,
          interval: interval,
          repetition: repetition,
          efactor: efactorRound,
          dueDate: dueDate,
          userId: userId,
        }),
      });
    } catch (error) {
      console.log("Please try again");
    }
  } else if (payload.length >= 1) {
    let score = Number(result / 2);
    let flashcard2 = formatObject(payload[0], score);
    const { front, interval, repetition, efactor, dueDate } = flashcard2;
    let efactorRound = Math.round(parseFloat(efactor * 1000) / 1000);
    try {
      const responsePatch = fetch(`${API_URL}/repeat`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          front: front,
          interval: interval,
          repetition: repetition,
          efactor: efactorRound,
          dueDate: dueDate,
          userId: userId,
        }),
      });
    } catch (error) {
      console.log("Please try again");
    }
  }
}
