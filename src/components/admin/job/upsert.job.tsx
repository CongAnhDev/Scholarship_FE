// import { Breadcrumb, Col, ConfigProvider, Divider, Form, Row, message, notification } from "antd";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { DebounceSelect } from "../user/debouce.select";
// import { FooterToolbar, ProForm, ProFormDatePicker, ProFormDigit, ProFormSelect, ProFormSwitch, ProFormText } from "@ant-design/pro-components";
// import styles from 'styles/admin.module.scss';
// import { LOCATION_LIST, SKILLS_LIST } from "@/config/utils";
// import { IProviderSelect } from "../user/modal.user";
// import { useState, useEffect } from 'react';
// import { callCreateScholarship, callFetchProvider, callFetchScholarshipById, callUpdateScholarship } from "@/config/api";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { CheckSquareOutlined } from "@ant-design/icons";
// import enUS from 'antd/lib/locale/en_US';
// import dayjs from 'dayjs';
// import { IScholarship } from "@/types/backend";

// const ViewUpsertScholarship = (props: any) => {
//     const [companies, setCompanies] = useState<IProviderSelect[]>([]);

//     const navigate = useNavigate();
//     const [value, setValue] = useState<string>("");

//     let location = useLocation();
//     let params = new URLSearchParams(location.search);
//     const id = params?.get("id"); // Scholarship id
//     const [dataUpdate, setDataUpdate] = useState<IScholarship | null>(null);
//     const [form] = Form.useForm();

//     useEffect(() => {
//         const init = async () => {
//             if (id) {
//                 const res = await callFetchScholarshipById(id);
//                 if (res && res.data) {
//                     setDataUpdate(res.data);
//                     setValue(res.data.description);
//                     setCompanies([
//                         {
//                             label: res.data.provider?.name as string,
//                             value: `${res.data.provider?._id}` as string,
//                             key: res.data.provider?._id
//                         }
//                     ])

//                     form.setFieldsValue({
//                         ...res.data,
//                         Provider: {
//                             label: res.data.provider?.name as string,
//                             value: `${res.data.provider?._id}` as string,
//                             key: res.data.provider?._id
//                         },

//                     })
//                 }
//             }
//         }
//         init();
//         return () => form.resetFields()
//     }, [id])

//     // Usage of DebounceSelect
//     async function fetchProviderList(name: string): Promise<IProviderSelect[]> {
//         const res = await callFetchProvider(`current=1&pageSize=100&name=/${name}/i`);
//         if (res && res.data) {
//             const list = res.data.result;
//             const temp = list.map(item => {
//                 return {
//                     label: item.name as string,
//                     value: `${item._id}@#$${item.logo}` as string
//                 }
//             })
//             return temp;
//         } else return [];
//     }

//     const onFinish = async (values: any) => {
//         if (dataUpdate?._id) {
//             //update
//             const cp = values?.Provider?.value?.split('@#$');
//             const Scholarship = {
//                 name: values.name,
//                 fundingMethod: values.fundingMethod,
//                 location: values.location,
//                 Provider: {
//                     _id: cp && cp.length > 0 ? cp[0] : "",
//                     name: values.Provider.label,
//                 },
//                 subject: values.subject,
//                 level: values.level;
//                 salary: values.salary,
//                 quantity: values.quantity,
//                 level: values.level,
//                 description: value,
//                 startDate: /[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/.test(values.startDate) ? dayjs(values.startDate, 'DD/MM/YYYY').toDate() : values.startDate,
//                 endDate: /[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/.test(values.endDate) ? dayjs(values.endDate, 'DD/MM/YYYY').toDate() : values.endDate,
//                 isActive: values.isActive
//             }

//             const res = await callUpdateScholarship(Scholarship, dataUpdate._id);
//             if (res.data) {
//                 message.success("Cập nhật Scholarship thành công");
//                 navigate('/admin/Scholarship')
//             } else {
//                 notification.error({
//                     message: 'Có lỗi xảy ra',
//                     description: res.message
//                 });
//             }
//         } else {
//             //create
//             const cp = values?.Provider?.value?.split('@#$');
//             const Scholarship = {
//                 name: values.name,
//                 skills: values.skills,
//                 Provider: {
//                     _id: cp && cp.length > 0 ? cp[0] : "",
//                     name: values.Provider.label,
//                     logo: cp && cp.length > 1 ? cp[1] : ""
//                 },
//                 location: values.location,
//                 salary: values.salary,
//                 quantity: values.quantity,
//                 level: values.level,
//                 description: value,
//                 startDate: dayjs(values.startDate, 'DD/MM/YYYY').toDate(),
//                 endDate: dayjs(values.endDate, 'DD/MM/YYYY').toDate(),
//                 isActive: values.isActive
//             }

//             const res = await callCreateScholarship(Scholarship);
//             if (res.data) {
//                 message.success("Tạo mới Scholarship thành công");
//                 navigate('/admin/Scholarship')
//             } else {
//                 notification.error({
//                     message: 'Có lỗi xảy ra',
//                     description: res.message
//                 });
//             }
//         }
//     }



//     return (
//         <div className={styles["upsert-Scholarship-container"]}>
//             <div className={styles["title"]}>
//                 <Breadcrumb
//                     separator=">"
//                     items={[
//                         {
//                             title: <Link to="/admin/Scholarship">Manage Scholarship</Link>,
//                         },
//                         {
//                             title: 'Upsert Scholarship',
//                         },
//                     ]}
//                 />
//             </div>
//             <div >

//                 <ConfigProvider locale={enUS}>
//                     <ProForm
//                         form={form}
//                         onFinish={onFinish}
//                         submitter={
//                             {
//                                 searchConfig: {
//                                     resetText: "Hủy",
//                                     submitText: <>{dataUpdate?._id ? "Cập nhật Scholarship" : "Tạo mới Scholarship"}</>
//                                 },
//                                 onReset: () => navigate('/admin/Scholarship'),
//                                 render: (_: any, dom: any) => <FooterToolbar>{dom}</FooterToolbar>,
//                                 submitButtonProps: {
//                                     icon: <CheckSquareOutlined />
//                                 },
//                             }
//                         }
//                     >
//                         <Row gutter={[20, 20]}>
//                             <Col span={24} md={12}>
//                                 <ProFormText
//                                     label="Tên Scholarship"
//                                     name="name"
//                                     rules={[
//                                         { required: true, message: 'Vui lòng không bỏ trống' },
//                                     ]}
//                                     placeholder="Nhập tên Scholarship"
//                                 />
//                             </Col>
//                             <Col span={24} md={6}>
//                                 <ProFormSelect
//                                     name="skills"
//                                     label="Kỹ năng yêu cầu"
//                                     options={SKILLS_LIST}
//                                     placeholder="Please select a skill"
//                                     rules={[{ required: true, message: 'Vui lòng chọn kỹ năng!' }]}
//                                     allowClear
//                                     mode="multiple"
//                                     fieldProps={{
//                                         showArrow: false
//                                     }}

//                                 />
//                             </Col>
//                             <Col span={24} md={6}>
//                                 <ProFormSelect
//                                     name="location"
//                                     label="Địa điểm"
//                                     options={LOCATION_LIST.filter(item => item.value !== 'ALL')}
//                                     placeholder="Please select a location"
//                                     rules={[{ required: true, message: 'Vui lòng chọn địa điểm!' }]}
//                                 />
//                             </Col>
//                             <Col span={24} md={6}>
//                                 <ProFormDigit
//                                     label="Mức lương"
//                                     name="salary"
//                                     rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
//                                     placeholder="Nhập mức lương"
//                                     fieldProps={{
//                                         addonAfter: " đ",
//                                         formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
//                                         parser: (value) => +(value || '').replace(/\$\s?|(,*)/g, '')
//                                     }}
//                                 />
//                             </Col>
//                             <Col span={24} md={6}>
//                                 <ProFormDigit
//                                     label="Số lượng"
//                                     name="quantity"
//                                     rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
//                                     placeholder="Nhập số lượng"
//                                 />
//                             </Col>
//                             <Col span={24} md={6}>
//                                 <ProFormSelect
//                                     name="level"
//                                     label="Trình độ"
//                                     valueEnum={{
//                                         INTERN: 'INTERN',
//                                         FRESHER: 'FRESHER',
//                                         JUNIOR: 'JUNIOR',
//                                         MIDDLE: 'MIDDLE',
//                                         SENIOR: 'SENIOR',
//                                     }}
//                                     placeholder="Please select a level"
//                                     rules={[{ required: true, message: 'Vui lòng chọn level!' }]}
//                                 />
//                             </Col>

//                             {(dataUpdate?._id || !id) &&
//                                 <Col span={24} md={6}>
//                                     <ProForm.Item
//                                         name="Provider"
//                                         label="Thuộc Công Ty"
//                                         rules={[{ required: true, message: 'Vui lòng chọn Provider!' }]}
//                                     >
//                                         <DebounceSelect
//                                             allowClear
//                                             showSearch
//                                             defaultValue={companies}
//                                             value={companies}
//                                             placeholder="Chọn công ty"
//                                             fetchOptions={fetchProviderList}
//                                             onChange={(newValue: any) => {
//                                                 if (newValue?.length === 0 || newValue?.length === 1) {
//                                                     setCompanies(newValue as IProviderSelect[]);
//                                                 }
//                                             }}
//                                             style={{ width: '100%' }}
//                                         />
//                                     </ProForm.Item>

//                                 </Col>
//                             }

//                         </Row>
//                         <Row gutter={[20, 20]}>
//                             <Col span={24} md={6}>
//                                 <ProFormDatePicker
//                                     label="Ngày bắt đầu"
//                                     name="startDate"
//                                     normalize={(value) => value && dayjs(value, 'DD/MM/YYYY')}
//                                     fieldProps={{
//                                         format: 'DD/MM/YYYY',

//                                     }}
//                                     rules={[{ required: true, message: 'Vui lòng chọn ngày cấp' }]}
//                                     placeholder="dd/mm/yyyy"
//                                 />
//                             </Col>
//                             <Col span={24} md={6}>
//                                 <ProFormDatePicker
//                                     label="Ngày kết thúc"
//                                     name="endDate"
//                                     normalize={(value) => value && dayjs(value, 'DD/MM/YYYY')}
//                                     fieldProps={{
//                                         format: 'DD/MM/YYYY',

//                                     }}
//                                     // width="auto"
//                                     rules={[{ required: true, message: 'Vui lòng chọn ngày cấp' }]}
//                                     placeholder="dd/mm/yyyy"
//                                 />
//                             </Col>
//                             <Col span={24} md={6}>
//                                 <ProFormSwitch
//                                     label="Trạng thái"
//                                     name="isActive"
//                                     checkedChildren="ACTIVE"
//                                     unCheckedChildren="INACTIVE"
//                                     initialValue={true}
//                                     fieldProps={{
//                                         defaultChecked: true,
//                                     }}
//                                 />
//                             </Col>
//                             <Col span={24}>
//                                 <ProForm.Item
//                                     name="description"
//                                     label="Miêu tả Scholarship"
//                                     rules={[{ required: true, message: 'Vui lòng nhập miêu tả Scholarship!' }]}
//                                 >
//                                     <ReactQuill
//                                         theme="snow"
//                                         value={value}
//                                         onChange={setValue}
//                                     />
//                                 </ProForm.Item>
//                             </Col>
//                         </Row>
//                         <Divider />
//                     </ProForm>
//                 </ConfigProvider>

//             </div>
//         </div>
//     )
// }

// export default ViewUpsertScholarship;