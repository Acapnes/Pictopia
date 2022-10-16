const PrettyEyeIcon = (props: any) => {
  return (
    <div className="flex items-center px-2">
      {!props.show ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          className="bi bi-eye-slash-fill"
          viewBox="0 0 16 16"
        >
          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          className="bi bi-eye-fill"
          viewBox="0 0 16 16"
        >
          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
        </svg>
      )}
    </div>
  );
};

const PrettyOptionsIcon = (props: any) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill={props.fill}
        className="bi bi-three-dots-vertical"
        viewBox="0 0 16 16"
      >
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
      </svg>
    </div>
  );
};

const PrettySearchIcon = (props: any) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="white"
        className="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>
    </div>
  );
};

const PrettyProfileIcon = (props: any) => {
  return (
    <img
      src={`data:${props?.user?.avatar?.contentType};base64,${props?.user?.avatar?.data}`}
      alt=""
      className="rounded-full w-full h-full object-cover p-[0.1rem]"
    />
  );
};

const PrettyPictopia = () => {
  return (
    <img
      src={`/pictopia_trans.png`}
      alt=""
      className="rounded-md w-full h-full object-cover p-[0.1rem]"
    />
  );
};

export {
  PrettyEyeIcon,
  PrettyOptionsIcon,
  PrettySearchIcon,
  PrettyProfileIcon,
  PrettyPictopia
};
