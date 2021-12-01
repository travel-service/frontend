import React, { createContext, useState, useContext} from 'react';

//상태값을 담을 박스
const UserContext = createContext();

//UserContextProvider 컴포넌트를 감싸기 위한 설정
export function UserContextProvider({ children }) {
    //글로벌하게 관리하고 싶은 상태값 지정
    const [user, setUser] = useState(null)
    return (
        //Provider을 통해 범위 안에 있는 컴포넌트에 값을 공유할 수 있음
        //value 값에 전송할 props 넣기 속성명(value)은 임의 변경 불가
        <UserContext.Provider 
            value={{
                user, 
                setUser,
            }}
        >
            { children }
        </UserContext.Provider>
    )
}

//value에 있는 값에 접근
export function useUserContext() {
    return useContext(UserContext)
}