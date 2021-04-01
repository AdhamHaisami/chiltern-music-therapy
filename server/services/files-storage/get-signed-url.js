import { v4 as uuid } from 'uuid';

import { S3, bucket, region, allowedFileTypesAndSizes } from './config';

const getSignedURL = async ({
  userId,
  fileType,
  fileCategory,
  fileName,
  fileSize,
  fileMaxSize,
}) => {
  const key = `${userId}/${fileType}-${uuid()}-${fileName}`;
  const sizeInMb = fileSize > 0 && fileSize / 1024 / 1024;

  //  check 1: correct file type
  if (!allowedFileTypesAndSizes[fileCategory].types.includes(fileType)) {
    throw new Error(
      `File is not a ${allowedFileTypesAndSizes[fileCategory].types} file`,
    );

    // check 2: max size
  } else if (
    fileMaxSize
      ? fileMaxSize < sizeInMb
      : allowedFileTypesAndSizes[fileCategory].maxSize < sizeInMb
  ) {
    throw new Error(
      `File is too large. Maximum file size is ${
        fileMaxSize || allowedFileTypesAndSizes[fileCategory].maxSize
      } MBs`,
    );
  }

  const url = await S3.getSignedUrlPromise('putObject', {
    Bucket: bucket,
    ContentType: fileType,
    Key: key,
  });

  return { url, name: fileName, key, bucketRegion: region, bucket };
};

export default getSignedURL;