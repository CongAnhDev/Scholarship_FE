import React from 'react';

export default function Component() {
  return (
    <>
      <div
        id='scholarship-landing-page-desc'
        className='bg-grey-light'
        style={{
          border: '0px solid rgb(229, 231, 235)',
          boxSizing: 'border-box',
          backgroundColor: '#EAEEF2',
        }}
      >
        <div
          className='max-w-container mx-auto px-[24px] pb-[24px] c-md:py-[40px] c-xl2:px-0'
          style={{
            border: '0px solid rgb(229, 231, 235)',
            boxSizing: 'border-box',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '1216px',
            paddingTop: '40px',
            paddingBottom: '40px',
            paddingLeft: '0px',
            paddingRight: '0px',
          }}
        >
          <p
            className='text-heading-6'
            style={{
              border: '0px solid rgb(229, 231, 235)',
              boxSizing: 'border-box',
              margin: '0px',
              fontSize: '18px',
              lineHeight: 1.3,
            }}
          >
            Bạn đang tìm kiếm học bổng để tài trợ cho việc học tập ở nước ngoài?
            Hầu hết các trường đại học hiện nay cung cấp nhiều lựa chọn học bổng
            đa dạng cho sinh viên quốc tế. Học bổng dựa trên thành tích được
            trao cho những sinh viên có thành tích học tập xuất sắc hoặc tiềm
            năng trong một lĩnh vực nghiên cứu nào đó. Sinh viên cũng có thể
            được trao giải thưởng nếu đạt thành tích xuất sắc trong các môn thể
            thao hoặc các hoạt động ngoại khóa. Một số trường đại học cũng có
            thể cung cấp học bổng dựa trên nhu cầu cho những sinh viên cần hỗ
            trợ tài chính. Bạn cần xác nhận với trường trước khi cam kết chi trả
            cho việc học tập thông qua hỗ trợ từ gia đình hoặc khoản vay.
          </p>
        </div>
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
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
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
