import {
  GoBack,
  Typography as T,
  Button,
  Grid,
  Inputs,
} from '../../../components';

import flowTypes from './flowTypes';

const { Row, Col } = Grid;
const { Textarea } = Inputs;

const AddDescription = ({ description, actions }) => {
  const { SET_DESCRIPTION, SET_FLOW } = actions;

  const goNext = () => {
    return SET_FLOW(flowTypes.addContent);
  };

  const setDescription = (val) => {
    return SET_DESCRIPTION(val);
  };

  return (
    <>
      <GoBack />
      <Row mT={5}>
        <Col w={[4, 12, 12]}>
          <T.H1 color="gray10">
            <strong>Add</strong> New Programme
          </T.H1>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 6, 4]}>
          <Textarea
            label="Please add a brief description of the content you are sharing and what you would like them to work on this week."
            rows={5}
            value={description}
            handleChange={setDescription}
          />
        </Col>
      </Row>
      <Row mT={2}>
        <Col w={[4, 6, 4]}>
          {/* TOTO ADD CC */}
          <T.P>Example Text</T.P>
        </Col>
      </Row>
      <Row mT={5}>
        <Col w={[4, 4, 4]}>
          <Button variant="primary" text="Next" handleClick={goNext} />
        </Col>
      </Row>
    </>
  );
};

export default AddDescription;
