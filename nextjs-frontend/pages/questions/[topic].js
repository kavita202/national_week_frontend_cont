import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { table, minifyRecords } from "../api/utils/index.js";
import { useState, useEffect } from "react";
function shuffleArray(array) {
  let i = array.length;
  while (i--) {
    const ri = Math.floor(Math.random() * i);
    [array[i], array[ri]] = [array[ri], array[i]];
  }
  return array;
}

function Topic({ data }) {
  console.log(data);
  const [result, setResult] = useState(-1);
  const [shuffledAns, setShuffledAns] = useState([]);
  const [colorChange, setColorChange] = useState("");
  const [userChoices, setUserChoices] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  useEffect(() => {
    if (data) {
      let answerArray = data.map((set) => [
        { answer: set.fields.correct, correct: true },
        ...set.fields.incorrect.map(function (ans) {
          return { answer: ans, correct: false };
        }),
      ]);
      setShuffledAns(answerArray.map((set) => shuffleArray(set)));
    }
  }, [data]);

  function handleClick(e) {
    e.preventDefault();
    let count = 0;
    for (let i = 0; i < userChoices.length; i++) {
      if (userChoices[i] === data[i].correct_answer) {
        setColorChange("green");
        count++;
      }
    }
    setResult(count);
  }
  function handleUserChoice(e, i) {
    setUserChoices([
      ...userChoices.slice(0, i),
      e,
      ...userChoices.slice(i + 1),
    ]);
  }

  if (shuffledAns.length > 1 && data) {
    return (
      <div className="question_Section">
        <h2>
          {data[0].fields.Topic[0].toUpperCase() +
            data[0].fields.Topic.slice(1)}{" "}
        </h2>
        <form onSubmit={handleClick}>
          {data.map(({ fields }, i) => (
            <div className="QuestionBox" key={data.id}>
              <h4>{fields.Question}</h4>
              {shuffledAns[i].map((obj) => (
                <label
                  key={nanoid()}
                  style={{
                    color: obj.correct ? colorChange : "",
                  }}
                >
                  <input
                    type="radio"
                    value={obj.correct}
                    name={fields.Question}
                    checked={userChoices[i] === obj.answer}
                    onChange={() => handleUserChoice(obj.answer, i)}
                    required
                  />
                  {obj.answer}
                  <br></br>
                </label>
              ))}
            </div>
          ))}
          <div className="feedback">
            <button type="submit">Submit</button>
            {result > -1 ? (
              <h3 style={{ color: result > 4 ? "green" : "red" }}>
                You scored {result} out of 6.
              </h3>
            ) : (
              <></>
            )}
          </div>
        </form>
      </div>
    );
  } else {
    return <></>;
  }
}
// return (
//   <div>
//     {data.map(({ fields }) => {
//       return <p>{fields.Question}</p>;
//     })}
//   </div>
// );

export async function getServerSideProps(context) {
  const { topic } = context.query;
  let data = await table
    .select({
      maxRecords: 6,
      view: "Grid view",
      filterByFormula: `{Topic} = '${topic}'`,
    })
    .firstPage();
  data = minifyRecords(data);
  // console.log(data[0]);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default Topic;
