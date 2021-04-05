import { useState, useEffect } from 'react';
import { useLocation, useHistory, Prompt } from 'react-router-dom';

import {
  GoBack,
  Typography as T,
  Button,
  Grid,
  Inputs,
  FileUpload,
} from '../../../components';

import { content, navRoutes, roles } from '../../../constants';

import validate from '../../../validation/schemas/addSingleContent';

import * as S from './style';

const { fileCategories } = content;

const { Row, Col } = Grid;
const { BasicInput, Textarea, Dropdown, Checkbox } = Inputs;

const AddSingleContent = ({ state: parentState, actions }) => {
  const [unsavedChanges, setUnsavedChanges] = useState(true);
  const [submitAttempt, setSubmitAttempt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contentInput, setContentInput] = useState(null);

  const { singleContent, fileUpload } = parentState;

  const {
    fileUploading,
    data: uploadedFileInfo,
    error: fileUploadError,
  } = fileUpload;

  const {
    title,
    categories,
    link,
    docContent,
    libraryContent,
    instructions,
    validationErrs,
  } = singleContent;

  const {
    state: { category },
  } = useLocation();

  const history = useHistory();

  const {
    // UPDATE_CONTENT,
    UPDATE_SINGLE_CONTENT,
    HANDLE_UPLOAD_STATUS,
    HANDLE_FILE_UPLOAD_INFO,
    HANDLE_FILE_UPLOAD_ERROR,
    // RESET_SINGLE_CONTENT,
  } = actions;

  const validateForm = () => {
    try {
      const formData = {
        title,
        categories,
        libraryContent,
        instructions,
        contentInput: {
          // category,
          // fileUploaded: uploadedFileInfo.uploadedToS3,
        },
      };

      if (link.length > 0) {
        formData.link = link;
      } else if (docContent.length > 0) {
        formData.docContent = docContent;
      }

      validate(formData);
      UPDATE_SINGLE_CONTENT('validationErrs', {});
      return true;
    } catch (error) {
      if (error.name === 'ValidationError') {
        UPDATE_SINGLE_CONTENT('validationErrs', error.inner);
      }
      return false;
    }
  };

  useEffect(() => {
    if (submitAttempt) {
      validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, categories, link, docContent, libraryContent, instructions]);

  const handleAddSingleContent = async (submitType) => {
    setLoading(true);
    // add single content to overall content
    console.log('adding ...');
    setLoading(false);
    // error handling
    if (submitType === 'content') {
      history.push(navRoutes.THERAPIST.CREATE_PROGRAM_CONTENT);
    } else {
      history.push(navRoutes.THERAPIST.CREATE_PROGRAM_REVIEW);
    }
  };

  const handleSubmit = (e, submitType) => {
    e.preventDefault();
    setSubmitAttempt(true);
    setUnsavedChanges(false);

    const isValid = validateForm();
    if (isValid) {
      handleAddSingleContent(submitType);
    }
  };
  console.log('s', singleContent);

  const fakeCategories = [
    { label: 'Option 1', value: 'Option 1' },
    { label: 'Option 2', value: 'Option 2' },
  ];
  return (
    <S.Wrapper onSubmit={handleSubmit}>
      <Prompt
        when={unsavedChanges}
        message="All changes will be lost. Are you sure you want to leave?"
      />
      {/* TODO ADD CUSTOM FUNCTION TO RESET STATE */}
      <GoBack />
      <Row mt={5} mb={7}>
        <Col w={[4, 12, 12]}>
          <T.H1 color="gray10">
            <strong>Add</strong> {category}
          </T.H1>
        </Col>
      </Row>
      {/* ADD VIDEO EXPLAINER */}
      <Row>
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <BasicInput
            placeholder="Type here..."
            label="Title"
            color="gray8"
            value={title}
            handleChange={(value) => UPDATE_SINGLE_CONTENT('title', value)}
            error={validationErrs.title}
          />
        </Col>
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <Dropdown
            label="Categories"
            color="gray8"
            options={fakeCategories}
            multi={true}
            placeholder="Select...(optional)"
            search={false}
            handleChange={(value) => UPDATE_SINGLE_CONTENT('categories', value)}
            error={validationErrs.categories}
          />
        </Col>
      </Row>
      <Row>
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <FileUpload
            category={category}
            setUploading={HANDLE_UPLOAD_STATUS}
            uploading={fileUploading}
            setFileInfo={HANDLE_FILE_UPLOAD_INFO}
            fileInfo={uploadedFileInfo}
            setError={HANDLE_FILE_UPLOAD_ERROR}
            error={fileUploadError}
            // disable when user adds link to resource
            disabled={
              (typeof link === 'string' && link.length > 0) ||
              (typeof docContent === 'string' && docContent.length > 0)
            }
          />
        </Col>
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <BasicInput
            placeholder="Type here..."
            label="If you prefer, you can paste a link to an external resource in the input below"
            color="gray8"
            value={link}
            handleChange={(value) => UPDATE_SINGLE_CONTENT('link', value)}
            disabled={
              (typeof docContent === 'string' && docContent.length > 0) ||
              fileUploading ||
              uploadedFileInfo.uploadedToS3
            }
            error={
              validationErrs.contentInput && validationErrs.contentInput.link
            }
          />
        </Col>
      </Row>
      <Row>
        {category === fileCategories.document && (
          <Col w={[4, 12, 4]} mb={7} mbM={5}>
            <Textarea
              label="Or create the content right now"
              color="gray8"
              placeholder="Type here..."
              rows={5}
              value={docContent}
              handleChange={(value) =>
                UPDATE_SINGLE_CONTENT('docContent', value)
              }
              disabled={
                (typeof link === 'string' && link.length > 0) ||
                fileUploading ||
                uploadedFileInfo.uploadedToS3
              }
              error={
                validationErrs.contentInput &&
                validationErrs.contentInput.docContent
              }
            />
          </Col>
        )}
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <Textarea
            label="Want to add any more specific instructions for this content?"
            color="gray8"
            placeholder="Message"
            rows={5}
            value={instructions}
            handleChange={(value) =>
              UPDATE_SINGLE_CONTENT('instructions', value)
            }
            error={validationErrs.instructions}
          />
        </Col>
      </Row>
      <Row>
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <Checkbox
            label={
              <T.P color="gray8">
                Save this video to
                <T.Link to={navRoutes.THERAPIST.LIBRARY} bold external>
                  &nbsp; My Library
                </T.Link>
                &nbsp; so I can use it again in the future
              </T.P>
            }
            checked={libraryContent}
            handleChange={(value) =>
              UPDATE_SINGLE_CONTENT('libraryContent', value)
            }
            error={validationErrs.libraryContent}
          />
        </Col>
      </Row>
      <Row mt={7}>
        <Col w={[4, 12, 4]} mbM={5} mbT={5}>
          <Button
            variant="primary"
            text="Add more content"
            type="submit"
            handleClick={(e) => handleSubmit(e, 'content')}
          />
        </Col>
        <Col w={[4, 12, 4]}>
          <Button
            variant="secondary"
            text="Review and finish"
            type="submit"
            handleClick={(e) => handleSubmit(e, 'review')}
          />
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default AddSingleContent;
