import React from "react";

export default function Component() {
  return (
    <>
      <div
        className="flex w-full gap-[20px]"
        style={{
          border: "0px solid rgb(229, 231, 235)",
          boxSizing: "border-box",
          display: "flex",
          width: "100%",
          gap: "20px",
        }}
      >
        <button
          className="btn btn--lg btn--tertiary min-w-[250px] hidden c-lg:block"
          style={{
            border: "0px solid rgb(229, 231, 235)",
            boxSizing: "border-box",
            margin: "0px",
            textTransform: "none",
            appearance: "button",
            backgroundImage: "none",
            cursor: "pointer",
            borderRadius: "108px",
            borderWidth: "1px",
            textAlign: "center",
            color: "rgb(255 255 255/1)",
            transitionProperty: "all",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "0.15s",
            padding: "12px 28px",
            fontSize: "18px",
            lineHeight: "24px",
            minWidth: "250px",
            borderColor: "rgb(214 65 5/1)",
            backgroundColor: "rgb(214 65 5/1)",
            display: "block",
            fontFamily: "BuenosAiresVN, sans-serif",
            fontWeight: 400,
          }}
        >
          <span
            className="btn__text cursor-pointer"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              cursor: "pointer",
              position: "relative",
              zIndex: 1,
            }}
          >
            Tư vấn ngay
          </span>
        </button>
        <a
          className="btn btn--lg btn--grey-outline hidden c-lg:block"
          href="https://www.idp.com/find-a-course/?institution_name=Monash-University"
          style={{
            border: "0px solid rgb(229, 231, 235)",
            boxSizing: "border-box",
            textDecoration: "inherit",
            cursor: "pointer",
            textDecorationLine: "none",
            borderRadius: "108px",
            borderWidth: "1px",
            textAlign: "center",
            transitionProperty: "all",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "0.15s",
            padding: "12px 28px",
            fontSize: "18px",
            lineHeight: "24px",
            borderColor: "rgb(113 117 122/1)",
            backgroundColor: "initial",
            color: "rgb(28 31 42/1)",
            display: "block",
            fontFamily: "BuenosAiresVN, sans-serif",
            fontWeight: 400,
          }}
        >
          Xem tất cả các khóa học
        </a>
        <button
          className="btn btn--lg btn--grey-outline"
          aria-label="Share button"
          style={{
            border: "0px solid rgb(229, 231, 235)",
            boxSizing: "border-box",
            margin: "0px",
            textTransform: "none",
            appearance: "button",
            backgroundImage: "none",
            cursor: "pointer",
            borderRadius: "108px",
            borderWidth: "1px",
            textAlign: "center",
            transitionProperty: "all",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "0.15s",
            padding: "12px 28px",
            fontSize: "18px",
            lineHeight: "24px",
            borderColor: "rgb(113 117 122/1)",
            backgroundColor: "initial",
            color: "rgb(28 31 42/1)",
            fontFamily: "BuenosAiresVN, sans-serif",
            fontWeight: 400,
          }}
        >
          <svg
            className="text-[24px] leading-[1]"
            height="1em"
            width="1em"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              display: "block",
              verticalAlign: "middle",
              fontSize: "24px",
              lineHeight: 1,
            }}
          >
            <path
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                border: "0px solid rgb(229, 231, 235)",
                boxSizing: "border-box",
              }}
            />
          </svg>
        </button>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
html {
  border: 0px solid rgb(229, 231, 235);
  box-sizing: border-box;
  line-height: 1.5;
  text-size-adjust: 100%;
  tab-size: 4;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-feature-settings: normal;
  font-variation-settings: normal;
}

body {
  border: 0px solid rgb(229, 231, 235);
  box-sizing: border-box;
  margin: 0px;
  font-size: 16px;
  line-height: 1.5;
  color: rgb(28 31 42/1);
  font-family: BuenosAiresVN, sans-serif;
  font-weight: 300;
  overflow: auto;
}
`,
        }}
      />
    </>
  );
}
