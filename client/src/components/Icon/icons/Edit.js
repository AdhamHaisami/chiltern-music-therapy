const Edit = ({ width, height, color, ...props }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    {...props}
  >
    <path
      d="M3.26099.96484C1.4618.96484 0 2.38792 0 4.15023V12.755c0 1.7614 1.4618 3.1856 3.26099 3.1856H11.715c1.798 0 3.2608-1.4242 3.2608-3.1856V4.71742c0-.4-.3247-.72371-.7247-.72371s-.7246.32371-.7246.72371V12.755c0 .9556-.8077 1.7363-1.8115 1.7363H3.26075c-1.00289 0-1.81147-.7807-1.81147-1.7363V4.15023c0-.95652.80857-1.73611 1.81171-1.73611h7.86941c.4 0 .7237-.32464.7237-.72464 0-.4-.3237-.72464-.7237-.72464H3.26099z"
      fill={color || 'currentColor'}
    />
    <path
      d="M14.7089.21264L7.94672 6.97577c-.28313.2822-.28313.74203 0 1.02423.28313.28313.74203.28313 1.02423 0l6.76315-6.7622c.2831-.28406.2831-.7432 0-1.02516C15.5931.07049 15.4076 0 15.2221 0s-.371.0705-.5132.21264z"
      fill={color || 'currentColor'}
    />
  </svg>
);

export default Edit;