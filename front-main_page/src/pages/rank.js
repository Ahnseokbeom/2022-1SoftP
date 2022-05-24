// import React, { useEffect, useState } from 'react'
// import rankJ from './rank.json'
import './rank.css'

const Rank = (props) => {
  return (
    <div className="rank">
      <h1>성공회대학교 랭킹</h1>
      {/* <div style={{ display: "inline", marginLeft: "80.9%" }}>
        <h3 style={{ display: "inline-block" }}>명단에 없을 경우 : </h3>
        <Link to="/register">
          <button
            style={{
              display: "inline-block",
              fontSize: "15px",
              borderRadius: "0%",
              border: "0",
              padding: "6px 12px",
              marginLeft: "1%",
              cursor: "pointer",
            }}
          >
            등록하기
          </button>
        </Link>
      </div> */}
      <div className="rankTable">
        <table>
          <thead>
            <tr>
              <th>전체 랭킹</th>
              <th>랭킹</th>
              <th>아이디</th>
              <th>레이팅</th>
              <th>CLASS</th>
              <th>푼 문제</th>
              <th>정답률</th>
            </tr>
          </thead>
          <tbody>
            {props.ranking.map((user, index) => (
              <tr key={index}>
                <td>{user.worldrank}</td>
                <td>{user.skhurank}</td>
                <td>
                  <img
                    src={
                      'https://static.solved.ac/tier_small/' +
                      user.tier +
                      '.svg'
                    }
                    alt="profile"
                    style={{ width: '3%', margin: '0 1% 0 0' }}
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
                </td>
                <td>{user.rating}</td>
                <td>{user.class}</td>
                <td>{user.pro}</td>
                <td>{user.correction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Rank
