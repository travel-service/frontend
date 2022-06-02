// 자체 로케이션 추가 버튼
import React, { useEffect, useState } from 'react';
import { MdOutlineLibraryAdd } from 'react-icons/md';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import ModalModule from 'components/common/modal/ModalModule';
import { useStore } from 'lib/store/planStore';
import { memLocStore } from 'lib/store/memberLocStore';

const CreateLocBtn = styled(MdOutlineLibraryAdd)`
  cursor: pointer;
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
`;

const Label = styled.label`
  width: 35%;
`;

const AddressDiv = styled.div`
  width: 65%;
`;

const Input = styled.input`
  /* margin-left: 10px; */
  /* margin-right: 10px; */
  width: 65%;
`;

const Type = styled.div`
  /* margin-left: 10px; */
  width: 65%;
`;

const Select = styled.select`
  width: 100%;
  /* margin-right: 10px; */
`;

const Textarea = styled.textarea`
  width: 65%;
`;

const Option = styled.option`
  width: 100%;
`;

const Span = styled.span`
  /* width: 100px; */
  margin-left: 20px;
`;

const DivDetail = styled.div`
  /* border: 2px solid red; */
`;

const Ul = styled.span`
  /* width: 100px; */
`;

const H4 = styled.h5`
  text-align: center;
`;

const Error = styled.div`
  text-align: center;
  color: red;
  margin-top: 10px;
`;

const CreateLoc = ({ size, onClick }) => {
  const { category } = useStore();
  const { createMemberLoc, typeInfo, onChangeTypeInfo, resetTypeInfo } =
    memLocStore();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [coords, setCoords] = useState({
    lat: null,
    lng: null,
  });
  const [form, setForm] = useState({
    summary: '',
    detail: '',
    name: '',
    share: null,
    type: '',
    address: '',
    image: '',
  });
  const [typeDefaultData, setTypeDefaultData] = useState({});
  const [errMsg, setErrMsg] = useState(null);
  const { name, share, type, address, image, summary, detail } = form;

  useEffect(() => {
    setTypeDefaultData(typeInfo[type]); // 타입 설정시 타입별 기본 데이터 가져오기
  }, [type]);

  const onChange = (e) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setErrMsg(null);
    setForm({
      name: '',
      share: null,
      type: '',
      address: '',
      image: '',
      summary: '',
      detail: '',
    });
    setModalIsOpen(false);
  };

  const onSelect = (e) => {
    console.log(e);
    setForm({
      ...form,
      name: e.place_name,
      address: e.address_name,
    });
    setCoords({
      lat: e.y,
      lng: e.x,
    });
  };

  const onSubmit = () => {
    console.log(form);
    // typeInfo의 타입에 따라 데이터들 모두 store에 전송해서 api요청
    let res = createMemberLoc(form, coords, typeInfo[type]);
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

  // 0531 필수입력감 검증 기능 추가 필요

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
        map="memberLoc"
        onSelect={onSelect}
        onSubmit={onSubmit}
      >
        <Container>
          {/*  Div + input, Div + radio 컴포넌트화 필요(220602) */}
          <Div>
            <Label htmlFor="name">여행지 이름</Label>
            <Input
              id="name"
              name="name"
              onChange={onChange}
              placeholder="여행지 이름을 입력해주세요."
              value={name}
            />
          </Div>
          <Div>
            <Label htmlFor="coord">여행지 주소</Label>
            <AddressDiv>
              {address
                ? `${address}`
                : `검색 후 선택하거나,  지도에 표시해주세요.`}
            </AddressDiv>
          </Div>
          <Div>
            <Label htmlFor="share">공유 가능 여부</Label>
            <div>
              <Span>가능</Span>
              <input
                id="share"
                name="share"
                onChange={onChange}
                type="radio"
                value={true}
              />
              <Span>불가능</Span>
              <input
                id="share"
                name="share"
                onChange={onChange}
                type="radio"
                value={false}
              />
            </div>
          </Div>
          <Div>
            <Label htmlFor="image">이미지</Label>
            <Input
              id="image"
              name="image"
              onChange={onChange}
              placeholder="이미지 업로드해주세요"
            />
          </Div>
          <Div>
            <Label htmlFor="summary">간단한 설명</Label>
            <Input
              id="summary"
              onChange={onChange}
              placeholder="여행지에 대한 간단한 설명을 작성해주세요."
              name="summary"
            />
          </Div>
          <Div>
            <Label htmlFor="detail">자세한 설명</Label>
            <Textarea
              id="detail"
              name="detail"
              onChange={onChange}
              placeholder="여행지에 대한 자세한 설명을 작성해주세요."
            />
          </Div>
          <Div>
            <Label>카테고리 설정</Label>
            <Type>
              <Select name="type" onChange={onChange} value={type}>
                <Option value="">선택</Option>
                {Object.keys(category).map((key, index) => (
                  <Option value={category[key].eng} key={index}>
                    {category[key].kor}
                  </Option>
                ))}
                <Option value="기타">기타</Option>
              </Select>
            </Type>
          </Div>
          {typeDefaultData && (
            <DivDetail>
              <hr />
              <H4>카테고리별 세부정보 설정</H4>
              <hr />
              <Ul>
                {Object.keys(typeDefaultData).map((e, i) => {
                  let title = typeDefaultData[e][0];
                  let inputSample = typeDefaultData[e][1];
                  return (
                    <Div key={i}>
                      <Label>{title}</Label>
                      {typeof inputSample === 'boolean' && (
                        <div>
                          {/* 수정필요 */}
                          가능
                          <input type="radio" />
                          불가능
                          <input type="radio" />
                        </div>
                      )}
                      {typeof inputSample !== 'boolean' && (
                        <Input
                          onChange={(el) =>
                            onChangeTypeInfo(type, e, el.target.value)
                          }
                          placeholder={inputSample}
                          name={e}
                        />
                      )}
                    </Div>
                  );
                })}
              </Ul>
            </DivDetail>
          )}
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
