import React, { useState, useEffect } from 'react'
import './rating.css'
import IconN from '../image/none.svg'
import IconB from '../image/5.svg'
import IconS from '../image/10.svg'
import IconG from '../image/15.svg'
import IconP from '../image/20.svg'
import IconD from '../image/25.svg'
import IconM from '../image/30.svg'
import Fade from '@mui/material/Fade'

const Rating = (props) => {
  // 랭크의 image를 출력하기 위한 번호
  const t = [IconN, IconB, IconS, IconG, IconP, IconD, IconM]
  const rank = [
    [0, 0, 0, 0, 0],
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30],
  ]
  const [checked, setChecked] = useState(false)
  // 각 랭크의 서브 랭크를 넣기 위한 변수
  const [rankArray, setRankArray] = useState()

  // 유저 또는 랭크 별로 알고리즘을 받을지 결정하는 boolean 변수
  const [userOrRank, setUserOrRank] = useState(true)

  // 유저별로 추천된 문제를 저장하기 위한 변수
  const [ratingProblems, setRatingProblems] = useState([])

  // 랭크별 문제들을 저장하기 위한 변수
  const [rankProblem, setRankProblem] = useState('')

  // 비슷한 수준의 학생들을 저장하기 위한 변수
  const [similarStudent, setSimilarStudent] = useState([])

  // 유저별 문제 추천을 받기 위한 함수
  const ratingAdd = async () => {
    try {
      const body = {
        ID: props.globalID ? props.globalID : 'q9922000',
      }
      console.log('rating addd    ' + body)
      const requestOptions = {
        // 데이터 통신의 방법과 보낼 데이터의 종류, 데이터를 설정합니다.
        method: 'POST', // POST는 서버로 요청을 보내서 응답을 받고, GET은 서버로부터 응답만 받습니다. PUT은 수정, DELETE는 삭제
        headers: {
          'Content-Type': 'application/json',
        }, // json형태의 데이터를 서버로 보냅니다.
        body: JSON.stringify(body),
      }
      await fetch('http://localhost:3001/rating', requestOptions)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setRatingProblems(data[0])
          setSimilarStudent(data[1])
        })
    } catch (error) {
      console.error(error)
    }
  }

  // 각 랭크의 서브 랭크의 버튼을 추가하기 위한 함수
  const rankSubAdd = (index) => {
    setRankArray('')
    const result = []
    for (let i = 0; i < rank[index].length; i++) {
      result.push(
        <div key={i} className="rankButton">
          <img
            onClick={() => rankAdd(rank[index][i])}
            src={
              'https://static.solved.ac/tier_small/' + rank[index][i] + '.svg'
            }
            alt="profile"
          />
        </div>
      )
    }
    setChecked(true)
    setRankArray(result)
  }

  // 랭크별 문제 추천을 받기 위한 함수
  const rankAdd = (index) => {
    try {
      let t = (
        <iframe
          title="solvedProblems"
          style={{ border: 'none', marginTop: '-19vh' }}
          width="100%"
          height="230%"
          src={'https://solved.ac/problems/level/' + index}
        ></iframe>
      )
      setRankProblem(t)
    } catch (err) {
      return err
    }
  }

  useEffect(() => {
    ratingAdd()
  }, [])

  return (
    <div className="recommend">
      <button className="myButton" onClick={() => setUserOrRank(true)}>
        유저별
      </button>
      <button className="myButton" onClick={() => setUserOrRank(false)}>
        랭크별
      </button>
      {userOrRank ? (
        // 유저별 위치 =======================
        <div>
          <h1>문제 별 추천</h1>

          <div className="ratingProblem">
            <div className="similarStudent">
              <div style={{ paddingBottom: '2%' }}>
                <strong>
                  <big>나랑 비슷한 수준의 학생</big>
                </strong>
              </div>
              <div className="similarStudentInner">
                <div
                  className="p-head"
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                    fontSize: '80%',
                    borderRadius: '5px 5px 0 0',
                  }}
                >
                  <span>전체 랭킹</span>
                  <span>랭킹</span>
                  <span style={{ textAlign: 'center' }}>아이디</span>
                  <span>레이팅</span>
                  <span>CLASS</span>
                  <span>푼 문제</span>
                  <span>정답률</span>
                </div>
                {similarStudent &&
                  similarStudent.map((user, index) => (
                    <div key={index} className="p-head">
                      <span>{user.worldrank}</span>
                      <span>{user.skhurank}</span>
                      <span>
                        <img
                          src={
                            'https://static.solved.ac/tier_small/' +
                            user.solvedrank +
                            '.svg'
                          }
                          alt="profile"
                          style={{ width: '7%', margin: '0 1% 0 0' }}
                        />{' '}
                        <strong>
                          <a
                            href={'https://solved.ac/profile/' + user.ID}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {user.ID}
                          </a>
                        </strong>
                      </span>
                      <span>{user.rating}</span>
                      <span>{user.class}</span>
                      <span>{user.pro}</span>
                      <span>{user.correction}</span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="recommendProblem">
              <div style={{ position: 'sticky', top: '0px' }}>
                <div style={{ paddingBottom: '1%' }}>
                  <strong>
                    <big>가장 적게 푼 문제</big>
                  </strong>
                </div>
                <div
                  className="p-head"
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                    borderRadius: '5px 5px 0 0',
                  }}
                >
                  <span>#</span>
                  <span>제목</span>
                  <span>시도</span>
                </div>
              </div>
              <div className="recommendProblemInner">
                {ratingProblems &&
                  ratingProblems.map((problem, index) => (
                    <div key={index} className="p-head">
                      <img
                        src={
                          'https://static.solved.ac/tier_small/' +
                          problem.SOLVED_RANK +
                          '.svg'
                        }
                        alt="profile"
                        style={{ width: '2%', margin: '0 1% 0 0' }}
                      />
                      <span>{problem.PROBLEM_ID}</span>
                      <span>{problem.namekr}</span>
                      <span>{problem.sum}명 시도</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // 랭크별 위치 ================================================
        <div>
          <h1>랭크 페이지</h1>
          {/* <span>
            <input type="text" />
            <button>search</button>
          </span> */}
          <div className="rankProblem">
            <div className="rank">
              {rank.map((n, index) => (
                <div key={index} className="rankButton">
                  <img
                    src={t[index]}
                    alt="profile"
                    style={{ width: '100%' }}
                    onClick={() => {
                      setChecked(false)
                      index === 0 ? rankAdd(0) : rankSubAdd(index)
                    }}
                  />
                </div>
              ))}
              {/* 서브 랭크 출력하는 구간 */}
              <Fade in={checked}>
                <div className="subRank">{rankArray}</div>
              </Fade>
            </div>
            <div className="rankProblems">{rankProblem}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Rating
