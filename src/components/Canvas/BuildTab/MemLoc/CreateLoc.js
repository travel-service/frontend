// 자체 로케이션 추가 버튼
import React, { useEffect, useState } from 'react';
import { MdOutlineLibraryAdd } from 'react-icons/md';
import styled, { css } from 'styled-components';
import ReactTooltip from 'react-tooltip';
import ModalModule from 'components/common/modal/ModalModule';
import { useStore } from 'lib/zustand/planStore';
import { memLocStore } from 'lib/zustand/memberLocStore';
import DivInput from './DivInput';
import DivAddr from './DivAddr';
import DivRadioInput from './DivRadioInput';
import InputComponent from './InputComponent';

const CreateLocBtn = styled(MdOutlineLibraryAdd)`
  cursor: pointer;
`;

const EssenSpan = styled.span`
  color: red;
`;

const Div = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  /* padding-left: 50px; */
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 30vw;
  @media screen and (max-width: 767px) {
    width: 90vw;
    /* height: 40vh; */
  }

  .inputBtn {
    height: 45px;
    background: #ffffff;
    border: 1px solid #010101;
    border-radius: 5px;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    cursor: pointer;
    :hover {
      background: black;
      color: white;
      transition: 0.2s all linear;
    }
    :active {
      transform: translateY(5px);
    }
  }
`;

const Label = styled.label`
  width: 35%;
`;

const RightDiv = styled.div`
  /* margin-left: 10px; */
  width: 65%;
`;

const Select = styled.select`
  /* width: 100%; */
  /* margin-right: 10px; */
`;

const Option = styled.option`
  width: 100%;
`;

const DivDetail = styled.div``;

const Ul = styled.span``;

const H4 = styled.h5`
  text-align: center;
`;

const Error = styled.div`
  text-align: center;
  color: red;
  margin-top: 10px;
`;

const TypeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 10px;
`;

const TypeRadio = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  label {
    font-size: 13px;
    font-weight: 400;
  }
`;

const Radio = styled.div`
  width: 25px;
  height: 25px;
  border: 1px solid #e5e7e8;
  border-radius: 5px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CheckDiv = styled.div`
  width: 9px;
  height: 9px;
  ${(props) =>
    props.checked &&
    css`
      background: #f75d5d;
    `}

  border-radius: 100%;
`;

const MoreInfo = styled.div`
  display: flex;
  margin-bottom: 5px;

  ${Select} {
    width: 110px;
    height: 45px;
    margin-right: 10px;
    margin-top: 5px;
  }

  input {
    flex: 1;
  }
`;

const CreateLoc = ({ size, onClick }) => {
  const { category } = useStore();
  const { createMemberLoc, typeInfo, onChangeTypeInfo, resetTypeInfo } =
    memLocStore();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [check, setCheck] = useState('1'); // default Attraction : 1
  const [coords, setCoords] = useState({
    latitude: null,
    longitude: null,
  });
  const [form, setForm] = useState({
    name: '',
    address1: '',
    address2: '',
    share: null,
    image: '',
    image1: '',
    image2: '',
    tel: '',
    summary: '',
    report: '',
    type: '', // default Attraction
  });
  const [typeDefaultData, setTypeDefaultData] = useState({});
  const [errMsg, setErrMsg] = useState(null);
  // const [detail, setDetail] = useState('');
  const {
    name,
    share,
    type,
    address1,
    address2,
    image,
    image1,
    image2,
    tel,
    summary,
    report,
  } = form;

  const [detail, setDetail] = useState([
    {
      key: 'etc',
      title: '항목',
      placeHolder: null,
      input: '',
    },
  ]);

  useEffect(() => {
    if (check === 'etc') {
      setTypeDefaultData({});
      return;
    }
    setTypeDefaultData(typeInfo[category[check].eng]); // 타입 설정시 타입별 기본 데이터 가져오기
  }, [check]);

  const onChange = (e) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };

  const onChangeDetail = (e, index) => {
    if (e.target.value === '항목') return;
    let obj = {
      key: e.target.value,
      title: typeDefaultData[e.target.value][0],
      placeHolder: typeDefaultData[e.target.value][1],
      input: '',
    };
    let tmp = detail.slice();
    tmp.splice(index, 1, obj);
    setDetail(tmp);
  };

  useEffect(() => {
    console.log('detail:', detail); // 삭제예정
  }, [detail]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setErrMsg(null);
    setForm({
      name: '',
      share: null,
      type: '',
      address1: '',
      address2: '',
      image: '',
      image1: '',
      image2: '',
      tel: '',
      summary: '',
      report: '',
    });
    setModalIsOpen(false);
    setCheck('1');
  };

  const onSelect = (e) => {
    setForm({
      ...form,
      name: e.place_name,
      address1: e.address_name,
    });
    setCoords({
      latitude: e.y,
      longitude: e.x,
    });
  };

  const onSubmit = async () => {
    // typeInfo의 타입에 따라 데이터들 모두 store에 전송해서 api요청
    let res = await createMemberLoc(form, coords, typeInfo[type]);
    console.log(res);
    if (res === 'success') {
      // 다시 초기화, typeDefaultData 사용, typeInfo 덮어쓰기
      resetTypeInfo(type, typeDefaultData);
      closeModal();
      alert('여행지가 생성되었습니다!');
    } else {
      setErrMsg(res[1]);
    }
  };

  const onClickType = (n) => {
    setCheck(n);
    setDetail([
      {
        key: 'etc',
        title: '항목',
        placeHolder: null,
        input: '',
      },
    ]);
  };

  const onClickCnt = () => {
    setDetail([
      ...detail,
      {
        key: 'etc',
        title: '항목',
        placeHolder: null,
        input: '',
      },
    ]);
  };

  const onClickDel = (index) => {
    let tmp = detail.slice();
    tmp.splice(index, 1);
    setDetail(tmp);
  };

  return (
    <>
      <CreateLocBtn
        size={size}
        onClick={openModal}
        data-tip
        data-for="createLoc"
      />
      <ReactTooltip id="createLoc" place="left" type="info" effect="solid">
        <div>자체 로케이션을 생성할 수 있습니다.</div>
      </ReactTooltip>
      <ModalModule
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        title="자체 블록"
        // map="memberLoc"
        onSelect={onSelect}
        onSubmit={onSubmit}
      >
        <Container className="memberLoc">
          <TypeGrid>
            {Object.keys(category).map((typeNum, index) => (
              <TypeRadio key={index}>
                <Radio onClick={() => onClickType(typeNum)}>
                  <CheckDiv checked={typeNum === check}></CheckDiv>
                </Radio>
                <label>{category[typeNum].kor}</label>
              </TypeRadio>
            ))}
            <TypeRadio>
              <Radio onClick={() => onClickType('etc')}>
                <CheckDiv checked={'etc' === check}></CheckDiv>
              </Radio>
              <label>기타</label>
            </TypeRadio>
          </TypeGrid>
          <InputComponent placeholder="블록명을 입력해주세요" />
          <InputComponent placeholder="블록 주소" />
          {Object.keys(typeDefaultData).length > 0 &&
            detail.map((obj, i) => (
              <MoreInfo key={i}>
                <Select
                  onChange={(e) => onChangeDetail(e, i)}
                  // value={detail[e].title}
                  value={detail[i]}
                >
                  <Option value="항목">{obj.title}</Option>
                  {Object.keys(typeDefaultData).map((key, i) => (
                    <Option value={key} key={i}>
                      {typeDefaultData[key][0]}
                    </Option>
                  ))}
                </Select>
                {/* 0715 작업중 */}
                {obj.title !== '항목' && obj.placeHolder === false && (
                  <>
                    가능
                    <input type="radio" />
                    불가능
                    <input type="radio" />
                  </>
                )}
                {obj.title !== '항목' && obj.placeHolder !== false && (
                  <InputComponent
                    onChangeDetail={onChangeDetail}
                    placeholder={obj.placeHolder}
                  />
                )}
                <button onClick={() => onClickDel(i)}>취소</button>
              </MoreInfo>
            ))}
          <input
            className="inputBtn"
            type="button"
            onClick={onClickCnt}
            value="항목추가 +"
          />
          {/* {Object.keys(typeDefaultData).map((e, i) => {
            let title = typeDefaultData[e][0];
            let inputSample = typeDefaultData[e][1];
            if (typeof inputSample === 'boolean')
              return (
                <DivRadioInput
                  key={i}
                  title={title}
                  onChange={(el) => onChangeTypeInfo(type, e, el.target.value)}
                  id={e}
                />
              );
            else
              return (
                <DivInput
                  title={title}
                  onChange={(el) => onChangeTypeInfo(type, e, el.target.value)}
                  placeholder={inputSample}
                  id={e}
                  sub
                />
              );
          })} */}
          {/* 타입 선택시 디테일 항목 받아오기 0714 */}

          {/* <Select name="type" onChange={onChange} value={type}>
            <Option value="">선택</Option>
            {Object.keys(category).map((key, index) => (
              <Option value={category[key].eng} key={index}>
                {category[key].kor}
              </Option>
            ))}
            <Option value="기타">기타</Option>
          </Select> */}
          {/* <DivInput
            title="여행지 이름"
            onChange={onChange}
            val={name}
            id="name"
            placeholder="여행지 이름을 입력해주세요."
            essen={true}
          />
          <DivAddr
            title="여행지 주소"
            id="address1"
            val={address1}
            essen={true}
          />
          <DivInput
            title="여행지 세부 주소"
            onChange={onChange}
            val={address2}
            id="address2"
            placeholder="여행지 세부주소를 입력해주세요"
            essen={false}
          />
          <DivRadioInput
            title="공유 가능 여부"
            onChange={onChange}
            id="share"
            essen={true}
          />
          <DivInput
            title="기본 이미지"
            onChange={onChange}
            val={image}
            id="image"
            placeholder="이미지 업로드해주세요"
            essen={false}
          />
          <DivInput
            title="추가 이미지1"
            onChange={onChange}
            val={image1}
            id="image1"
            placeholder="이미지 업로드해주세요"
            essen={false}
          />
          <DivInput
            title="추가 이미지2"
            onChange={onChange}
            val={image2}
            id="image2"
            placeholder="이미지 업로드해주세요"
            essen={false}
          />
          <DivInput
            title="간단한 설명"
            onChange={onChange}
            val={summary}
            id="summary"
            placeholder="여행지에 대한 간단한 설명을 작성해주세요"
            essen={true}
          />
          <DivInput
            title="자세한 설명"
            onChange={onChange}
            val={report}
            id="report"
            placeholder="여행지에 대한 자세한 설명을 작성해주세요."
            essen={false}
            report
          />
          <DivInput
            title="전화번호"
            onChange={onChange}
            val={tel}
            id="tel"
            placeholder="전화번호를 입력해주세요"
            essen={false}
          /> */}
          {/* <Div>
            <Label>
              <EssenSpan>*</EssenSpan>카테고리 설정
            </Label>
            <RightDiv>
              <Select name="type" onChange={onChange} value={type}>
                <Option value="">선택</Option>
                {Object.keys(category).map((key, index) => (
                  <Option value={category[key].eng} key={index}>
                    {category[key].kor}
                  </Option>
                ))}
                <Option value="기타">기타</Option>
              </Select>
            </RightDiv>
          </Div> */}
          {/* {typeDefaultData && (
            <DivDetail>
              <hr />
              <H4>카테고리별 세부정보 설정</H4>
              <hr />
              <Ul>
                {Object.keys(typeDefaultData).map((e, i) => {
                  let title = typeDefaultData[e][0];
                  let inputSample = typeDefaultData[e][1];
                  if (typeof inputSample === 'boolean')
                    return (
                      <DivRadioInput
                        key={i}
                        title={title}
                        onChange={(el) =>
                          onChangeTypeInfo(type, e, el.target.value)
                        }
                        id={e}
                      />
                    );
                  else
                    return (
                      <DivInput
                        title={title}
                        onChange={(el) =>
                          onChangeTypeInfo(type, e, el.target.value)
                        }
                        placeholder={inputSample}
                        id={e}
                        sub
                      />
                    );
                })}
              </Ul>
            </DivDetail>
          )} */}
          {errMsg && (
            <div>
              {/* <hr /> */}
              <Error>{errMsg}</Error>
            </div>
          )}
        </Container>
      </ModalModule>
    </>
  );
};

export default CreateLoc;

//https://japing.tistory.com/entry/React-Select-Option%EC%9D%98-Value-%EC%86%8D%EC%84%B1%EC%97%90-Object%EB%A5%BC-%EC%96%B4%EB%96%BB%EA%B2%8C-%EB%8B%A4%EB%A3%B0-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C
// select => option 객체 직렬화, stringify
