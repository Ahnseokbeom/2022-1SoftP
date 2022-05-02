import React, { useState, useEffect } from "react";
import "./algorithm.css";
import usersJ from "./users.json";
import { Button } from "@material-ui/core";

const Algorithm = () => {
  const [json, setjson] = useState(usersJ);
  const [name, setName] = useState();

  const [opens, setOpens] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const algorithmAdd = async () => {
    try {
      await fetch("http://localhost:3001/algorithm")
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          setjson(data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const onClickEvente = (dataName, index) => {
    let open = [false, false, false, false, false, false, false];

    open[index] = !open[index];
    setOpens(open);
    setName(dataName);
  };

  const onClickReco = () => {
    alert("백준으로 연결");
  };

  useEffect(() => {
    algorithmAdd();
  }, []);

  return (
    <div className="Algo">
      <h1>USER ID</h1>
      <div className="user">
        {json.solved_tag.map((data, index) =>
          index < 7 ? (
            <Button
              className="userAlgo"
              key={data.name}
              onClick={() => onClickEvente(data.name, index)}
            >
              {data.name}
            </Button>
          ) : null
        )}
      </div>

      {opens.map((value, index) => (
        <div
          className="reco"
          key={index}
          style={{ display: opens[index] === false ? "none" : "revert" }}
        >
          {json.solved_tag.map((data, index) =>
            index < 7 ? (
              <Button
                className="recoAlgo"
                key={data.name}
                onClick={() => onClickReco()}
              >
                {name} {index + 1}번째 추천된 알고리즘
              </Button>
            ) : null
          )}
        </div>
      ))}
    </div>
  );
};

export default Algorithm;
