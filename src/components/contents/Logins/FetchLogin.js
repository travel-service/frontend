export const FetchLogin = async ({ Username, Password }) => {
    const response = await fetch("http://localhost:4000/users");

    if (response.ok) {
        //서버 통신 성공 시 user에 json 값 대입
        const users = await response.json();

        //users 객체 id 값이랑 page id 값 비교
        //일치하면 user에 대입
        const user = users.find((user) => user.username === username);
        if(!user || user.password !== password) {
            throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
        }

        //모두 일치하면 그 user 정보 return 값이 FetchLogin 함수값으로 출력
        //LoginPage에서 setUser 값 정보에 넣기
        return user;
    }
    throw new Error("서버 통신이 원활하지 않습니다.");
};