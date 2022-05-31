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
  margin-bottom: 7px;
  justify-content: space-between;
`;

const Container = styled.div`
  /* padding-left: 50px; */
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

const Label = styled.label`
  width: 100%;
`;

const Input = styled.input`
  margin-left: 10px;
  margin-right: 10px;
  width: 120px;
`;

const Type = styled.div`
  margin-left: 10px;
`;

const Select = styled.select`
  width: 100px;
  margin-right: 10px;
`;

const Span = styled.span`
  width: 100px;
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

const CreateLoc = ({ size, onClick }) => {
  const { category } = useStore();
  const { createMemberLoc, typeInfo, onChangeTypeInfo, resetTypeInfo } =
    memLocStore(); // 0530 설정 완료시 확인 누르면 store에 전송
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const [coords, setCoords] = useState({
    lat: null,
    lng: null,
  });
  const [form, setForm] = useState({
    name: '',
    share: null,
    type: '',
    address: '',
    image: '',
  });
  const [detailForm, setdetailForm] = useState({});
  const [typeDefaultData, setTypeDefaultData] = useState({});
  const { name, share, type, address, image } = form;

  useEffect(() => {
    setTypeDefaultData(typeInfo[type]);
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
    setModalIsOpen(false);
  };

  const onSelect = (e) => {
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
    // typeInfo의 타입에 따라 데이터들 모두 store에 전송해서 api요청
    createMemberLoc(form, coords, typeInfo[type]);
    // 다시 초기화, typeDefaultData 사용, typeinfo 덮어쓰기
    resetTypeInfo(type, typeDefaultData);
    closeModal();
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
            <Label htmlFor="coord">블록 좌표</Label>
            <div>
              {coords.lat
                ? `x: ${coords.lat}, y: ${coords.lng}`
                : '지도에서 선택해주세요'}
            </div>
          </Div>
          <Div>
            <Label htmlFor="share">공유 여부</Label>
            <Span>공개</Span>
            <input
              id="share"
              name="share"
              onChange={onChange}
              type="radio"
              value={true}
            />
            <Span>비공개</Span>
            <input
              id="share"
              name="share"
              onChange={onChange}
              type="radio"
              value={false}
            />
          </Div>
          <Div>
            <Label htmlFor="image">이미지</Label>
            <Input
              id="image"
              onChange={onChange}
              placeholder="이미지 업로드해주세요"
            />
          </Div>
          <Div>
            <Label>카테고리 설정</Label>
            <Type>
              <Select name="type" onChange={onChange} value={type}>
                <option value="">선택</option>
                {Object.keys(category).map((key, index) => (
                  <option value={category[key].eng} key={index}>
                    {category[key].kor}
                  </option>
                ))}
                <option value="기타">기타</option>
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
                      <span>{title}</span>
                      {typeof inputSample === 'boolean' && (
                        <div>
                          가능
                          <input type="radio" />
                          불가능
                          <input type="radio" />
                        </div>
                      )}
                      {typeof inputSample !== 'boolean' && (
                        <input
                          onChange={(el) =>
                            onChangeTypeInfo(type, e, el.target.value)
                          }
                          // value={typeInfo[type][e][1]}
                          placeholder={inputSample}
                          name={e}
                        />
                      )}
                    </Div>
                  );
                })}
                {/* {Object.keys(typeInfo[type]).map((e, i) => {
                  let title = typeInfo[type][e][0];
                  let inputSample = typeInfo[type][e][1];
                  return (
                    <Div key={i}>
                      <span>{title}</span>
                      {typeof inputSample === 'boolean' && (
                        <div>
                          가능
                          <input type="radio" />
                          불가능
                          <input type="radio" />
                        </div>
                      )}
                      {typeof inputSample !== 'boolean' && (
                        <input
                          value={inputSample}
                          placeholder={inputSample}
                          name={e}
                        />
                      )}
                    </Div>
                  );
                })} */}
              </Ul>
            </DivDetail>
          )}
        </Container>
      </ModalModule>
    </>
  );
};

export default CreateLoc;
