import {
  GoBack,
  Typography as T,
  Button,
  Grid,
  Content,
} from '../../../../components';

import * as S from '../style';
import flowTypes from '../flowTypes';

import AddSingleContent from './AddSingleContent';

const { Row, Col } = Grid;
const { AddContentSection } = Content;

const AddContent = ({ state, actions }) => {
  const {
    singleContent: { showModal },
  } = state;

  const goNext = () => {
    return actions.SET_FLOW(flowTypes.reviewFinish);
  };

  const goBack = () => {
    return actions.SET_FLOW(flowTypes.description);
  };

  return (
    <S.Wrapper>
      <GoBack customFn={goBack} />
      <Row mt={5}>
        <Col w={[4, 12, 9]}>
          <T.H1 color="gray10">
            <strong>Add</strong> New Programme
          </T.H1>
        </Col>
        <Col w={[4, 9, 7]} mt={5}>
          <T.P color="gray8">
            Great! Now it’s time to share content. Add as many videos, audio
            files, links and written content as you like!
          </T.P>
        </Col>
      </Row>
      <Row mt={5}>
        <AddContentSection />
      </Row>

      <Row mt={9}>
        <Col w={[4, 9, 4]}>
          {/* TODO add check to render if content */}
          <Button
            variant="secondary"
            text="Review and finish"
            // handleClick={handleClick}
          />
        </Col>
      </Row>
      {/*
      {!showModal && (
        <>
          <button
            onClick={() => {
              actions.HANDLE_SINGLE_CONTENT_MODAL();
              actions.HANDLE_CONTENT_TYPE('video');
            }}
          >
            Add Video
          </button>

          <button
            onClick={() => {
              actions.HANDLE_SINGLE_CONTENT_MODAL();
              actions.HANDLE_CONTENT_TYPE('application');
            }}
          >
            Add Doc
          </button>

          <button
            onClick={() => {
              actions.HANDLE_SINGLE_CONTENT_MODAL();
              actions.HANDLE_CONTENT_TYPE('audio');
            }}
          >
            Add Audio
          </button>
        </>
      )}

      {showModal && <AddSingleContent state={state} actions={actions} />}
      {state.content.length > 0 &&
        state.content.map((el) => (
          <ul>
            <li>
              type: {state.singleContent.contentType}, title: {el.title}, file:{' '}
              {el.uploadedFileInfo.name}
            </li>
          </ul>
        ))} */}
    </S.Wrapper>
  );
};

export default AddContent;
