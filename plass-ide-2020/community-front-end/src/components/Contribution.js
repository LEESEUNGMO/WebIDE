import React, { Component } from 'react'
export default class Contribution extends Component {
    render() {
        return (
            <div className = "contribution">
                <table border="1" className="table table-contribution">
                <thead>
                    <tr>
                        <th>프로젝트 기간</th>
                        <th>개발 내용</th>
                        <th>참여 인원</th>
                        <th>기여도</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2018.03 - 2018.12</td>
                        <td>동국대 웹 IDE Core 개발</td>
                        <td>이준영, 양승영, 이혜린, 양시연</td>
                        <td>
                            <p>이준영: Docker 기반 컴파일 서버 구축</p>
                            <p>양승영: Back-end API 구현</p>
                            <p>양시연: UI 및 디자인 설계</p>
                            <p>이혜린: 이벤트 핸들러 구현</p>
                        </td>
                    </tr>
                    <tr>
                        <td>2019.03 - 2019.06</td>
                        <td>사용자 인터페이스(UI) 설계 및 개발</td>
                        <td>김민성, 구미송, 심나영, 장효정</td>
                        <td>
                            <p>김민성: Back-end API 구현 및 지원 언어 확장</p>
                            <p>구미성: HTML 퍼블리싱</p>
                            <p>심나영: UI 및 디자인 설계</p>
                            <p>장효정: 데이터베이스 설계 및 구축</p>
                        </td>
                    </tr>
                    <tr>
                        <td>2019.11 - 2020.03</td>
                        <td>웹 IDE 고도화</td>
                        <td>김동효, 장종욱, 최수린, 김민성, 응웬딩흐엉</td>
                        <td>
                            <p>김동효: 프로젝트 총괄 및 Back-end API 리팩토링</p>
                            <p>장종욱: UI 및 디자인 설계</p>
                            <p>최수린: Back-end API 리팩토링</p>
                            <p>김민성: Docker 기반 컴파일 서버 리팩토링</p>
                            <p>응웬딩흐엉: UI 및 이밴트 핸들러 구현 </p>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        )
    }
}
