import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { IProvider } from "@/types/backend";
import { callFetchProviderById } from "@/config/api";
import styles from 'styles/client.module.scss';
import parse from 'html-react-parser';
import { Col, Divider, Row, Skeleton } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import DetailButton from "./buttondetail";


const ClientProviderDetailPage = (props: any) => {
    const [ProviderDetail, setProviderDetail] = useState<IProvider | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [visible, setVisible] = useState(true)
    const [visible2, setVisible2] = useState(true)
    const [visible3, setVisible3] = useState(false)
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    const id = params?.get("id"); // job id

    useEffect(() => {
        const init = async () => {
            if (id) {
                setIsLoading(true)
                const res = await callFetchProviderById(id);
                if (res?.data) {
                    setProviderDetail(res.data)
                }
                setIsLoading(false)
            }
        }
        init();
    }, [id]);
    return (
        <div className={`${styles["container"]} ${styles["detail-job-section"]}`}>
            {isLoading ?
                <Skeleton />
                :
                <Row gutter={[20, 20]}>
                    {ProviderDetail && ProviderDetail._id &&
                        <>
                        <div>
                            <Row gutter={[10, 10]} className={styles["custom-row"]}>
                                <div style={{ paddingTop: '30px' }}></div>
                                <Col span={8}><img
                                    alt="example"
                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/Provider/${ProviderDetail?.logo}`}
                                    style={{ width: '250px', height: '150px', objectFit: 'cover' }}
                                /></Col>
                                <Col span={16} style={{ color: '#353535', fontSize: '27px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, paddingLeft:'20px' }}><div>
                                    {ProviderDetail.name}
                                </div></Col>

                            </Row>
                            <DetailButton />
                            </div>
                            <div style={{ paddingTop: '30px' }}>
                                <div
                                    className="grid grid-cols-2 px-[16px] c-lg:px-0 c-lg:flex gap-[36px] c-lg:gap-[40px] flex-row flex-wrap justify-between"
                                    style={{
                                        border: "0px solid rgb(229, 231, 235)",
                                        boxSizing: "border-box",
                                        gridTemplateColumns: "repeat(2, minmax(0px, 1fr))",
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                        justifyContent: "space-between",
                                        display: "flex",
                                        gap: "40px",
                                        paddingLeft: "0px",
                                        paddingRight: "0px",
                                    }}
                                >
                                    <div
                                        className="flex flex-col"
                                        style={{
                                            border: "0px solid rgb(229, 231, 235)",
                                            boxSizing: "border-box",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <p
                                            className="block mb-[4px] c-lg:mb-[8px] font-semibold"
                                            style={{
                                                border: "0px solid rgb(229, 231, 235)",
                                                boxSizing: "border-box",
                                                margin: "0px",
                                                display: "block",
                                                fontWeight: 600,
                                                marginBottom: "8px",
                                            }}
                                        >
                                            Vị trí
                                        </p>
                                        <p
                                            className="text-heading-6"
                                            style={{
                                                border: "0px solid rgb(229, 231, 235)",
                                                boxSizing: "border-box",
                                                margin: "0px",
                                                fontSize: "18px",
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            {ProviderDetail?.address}

                                        </p>
                                    </div>
                                    <div
                                        className="flex flex-col"
                                        style={{
                                            border: "0px solid rgb(229, 231, 235)",
                                            boxSizing: "border-box",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <p
                                            className="block mb-[4px] c-lg:mb-[8px] font-semibold"
                                            style={{
                                                border: "0px solid rgb(229, 231, 235)",
                                                boxSizing: "border-box",
                                                margin: "0px",
                                                display: "block",
                                                fontWeight: 600,
                                                marginBottom: "8px",
                                            }}
                                        >
                                            Sinh viên
                                        </p>
                                        <p
                                            className="text-heading-6"
                                            style={{
                                                border: "0px solid rgb(229, 231, 235)",
                                                boxSizing: "border-box",
                                                margin: "0px",
                                                fontSize: "18px",
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            {ProviderDetail?.quantity}
                                        </p>
                                    </div>
                                    <div
                                        className="flex flex-col"
                                        style={{
                                            border: "0px solid rgb(229, 231, 235)",
                                            boxSizing: "border-box",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <p
                                            className="block mb-[4px] c-lg:mb-[8px] font-semibold"
                                            style={{
                                                border: "0px solid rgb(229, 231, 235)",
                                                boxSizing: "border-box",
                                                margin: "0px",
                                                display: "block",
                                                fontWeight: 600,
                                                marginBottom: "8px",
                                            }}
                                        >
                                            Top Việt Nam
                                        </p>
                                        <p
                                            className="text-heading-6"
                                            style={{
                                                border: "0px solid rgb(229, 231, 235)",
                                                boxSizing: "border-box",
                                                margin: "0px",
                                                fontSize: "18px",
                                                lineHeight: 1.3,
                                            }}
                                        >
                                        </p>
                                        <p
                                            className="text-heading-6"
                                            style={{
                                                border: "0px solid rgb(229, 231, 235)",
                                                boxSizing: "border-box",
                                                margin: "0px",
                                                fontSize: "18px",
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            {ProviderDetail?.topVN}
                                        </p>
                                    </div>
                                    <div
                                        className="flex flex-col"
                                        style={{
                                            border: "0px solid rgb(229, 231, 235)",
                                            boxSizing: "border-box",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <p
                                            className="block mb-[4px] c-lg:mb-[8px] font-semibold"
                                            style={{
                                                border: "0px solid rgb(229, 231, 235)",
                                                boxSizing: "border-box",
                                                margin: "0px",
                                                display: "block",
                                                fontWeight: 600,
                                                marginBottom: "8px",
                                            }}
                                        >
                                            Top Thế Giới
                                        </p>
                                        <p
                                            className="text-heading-6"
                                            style={{
                                                border: "0px solid rgb(229, 231, 235)",
                                                boxSizing: "border-box",
                                                margin: "0px",
                                                fontSize: "18px",
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            {ProviderDetail?.topWorld}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <h2
                                        className="text-neutral-1"
                                        style={{
                                            border: "0px solid rgb(229, 231, 235)",
                                            boxSizing: "border-box",
                                            margin: "0px",
                                            lineHeight: 1.3,
                                            fontSize: "32px",
                                            fontFamily: "BuenosAiresVN, sans-serif",
                                            fontWeight: 700,
                                            color: "rgb(28 31 42/1)",
                                            paddingTop: '50px'
                                        }}
                                    >
                                        Thông tin trường
                                        <span
                                            style={{
                                                border: "0px solid rgb(229, 231, 235)",
                                                boxSizing: "border-box",
                                                marginTop: "4px",
                                                display: "block",
                                                height: "6px",
                                                width: "24px",
                                                borderRadius: "8px",
                                                backgroundImage: "linear-gradient(to right,#e72d2d ,#f96d0b)",
                                            }}
                                        />
                                    </h2>
                                    <h3
                                        className="text-para c-md:text-heading-5 flex py-[20px] c-md:py-[24px] border-b font-custom-regular accordion-heading border-transparent"
                                        style={{
                                            border: "0px solid rgb(229, 231, 235)",
                                            boxSizing: "border-box",
                                            margin: "0px",
                                            display: "flex",
                                            borderBottomWidth: "1px",
                                            borderColor: "rgba(0, 0, 0, 0)",
                                            paddingTop: "24px",
                                            paddingBottom: "24px",
                                            fontSize: "20px",
                                            lineHeight: 1.3,
                                            fontFamily: "BuenosAiresVN, sans-serif",
                                            fontWeight: 400,
                                        }}
                                    >
                                        <button
                                            className="flex w-full gap-[8px]"
                                            aria-label="Collapse Tổng quan "
                                            onClick={() => setVisible2(!visible2)}
                                            aria-expanded={visible2}
                                            aria-controls="collapseWidthExample"
                                            style={{
                                                border: "0px solid rgb(229, 231, 235)",
                                                boxSizing: "border-box",
                                                margin: "0px",
                                                padding: "0px",
                                                fontSize: "100%",
                                                lineHeight: "inherit",
                                                color: "inherit",
                                                textTransform: "none",
                                                appearance: "button",
                                                backgroundColor: "initial",
                                                backgroundImage: "none",
                                                cursor: "pointer",
                                                fontFamily: "BuenosAiresVN, sans-serif",
                                                fontWeight: 400,
                                                display: "flex",
                                                width: "100%",
                                                gap: "8px",
                                            }}
                                        >
                                            <span
                                                className="flex-1 text-left"
                                                style={{
                                                    border: "0px solid rgb(229, 231, 235)",
                                                    boxSizing: "border-box",
                                                    flex: "1 1 0%",
                                                    textAlign: "left",
                                                }}
                                            >
                                                Khuôn Viên Trường
                                            </span>
                                            <svg
                                                className="relative top-[3px]"
                                                height="1em"
                                                width="1em"
                                                fill="currentColor"
                                                stroke="currentColor"
                                                strokeWidth="0"
                                                viewBox="0 0 512 512"
                                                xmlns="http://www.w3.org/2000/svg"

                                                style={{
                                                    border: "0px solid rgb(229, 231, 235)",
                                                    boxSizing: "border-box",
                                                    display: "block",
                                                    verticalAlign: "middle",
                                                    position: "relative",
                                                    top: "3px",
                                                    transform: visible2 ? 'rotate(0deg)' : 'rotate(-90deg)',
                                                    transition: 'transform 0.3s ease',
                                                }}
                                            >
                                                <path
                                                    d="M96 235h320v42H96z"
                                                    style={{
                                                        border: "0px solid rgb(229, 231, 235)",
                                                        boxSizing: "border-box",
                                                    }}
                                                />

                                            </svg>
                                        </button>
                                    </h3>
                                    {visible2 && (
                                                   <div>
                                                   {ProviderDetail.gallery.length === 1 ? (
                                                       <img src={ProviderDetail.gallery[0]} alt="Single Image" style={{ width: '100%', height: 'auto' }} />
                                                   ) : (
                                                       <div>
                                                           {ProviderDetail.gallery.map((image: string, index: number) => (
                                                               <img
                                                                   key={index}
                                                                   src={`${import.meta.env.VITE_BACKEND_URL}/images/gallery/`+image}
                                                                   alt={`Image ${index + 1}`}
                                                                   style={{ width: '25%', height: 'auto', maxWidth: '300px', maxHeight: '200px', margin: '5px' }}
                                                               />
                                                           ))}
                                                       </div>
                                                   )}
                                               </div>
                                    )}
                                    <h3
                                        className="text-para c-md:text-heading-5 flex py-[20px] c-md:py-[24px] border-b font-custom-regular accordion-heading border-transparent"
                                        style={{
                                            border: "0px solid rgb(229, 231, 235)",
                                            boxSizing: "border-box",
                                            margin: "0px",
                                            display: "flex",
                                            borderBottomWidth: "1px",
                                            borderColor: "rgba(0, 0, 0, 0)",
                                            paddingTop: "24px",
                                            paddingBottom: "24px",
                                            fontSize: "20px",
                                            lineHeight: 1.3,
                                            fontFamily: "BuenosAiresVN, sans-serif",
                                            fontWeight: 400,
                                        }}
                                    >
                                        <button
                                            className="flex w-full gap-[8px]"
                                            aria-label="Collapse Tổng quan "
                                            onClick={() => setVisible(!visible)}
                                            aria-expanded={visible}
                                            aria-controls="collapseWidthExample"
                                            style={{
                                                border: "0px solid rgb(229, 231, 235)",
                                                boxSizing: "border-box",
                                                margin: "0px",
                                                padding: "0px",
                                                fontSize: "100%",
                                                lineHeight: "inherit",
                                                color: "inherit",
                                                textTransform: "none",
                                                appearance: "button",
                                                backgroundColor: "initial",
                                                backgroundImage: "none",
                                                cursor: "pointer",
                                                fontFamily: "BuenosAiresVN, sans-serif",
                                                fontWeight: 400,
                                                display: "flex",
                                                width: "100%",
                                                gap: "8px",
                                            }}
                                        >
                                            <span
                                                className="flex-1 text-left"
                                                style={{
                                                    border: "0px solid rgb(229, 231, 235)",
                                                    boxSizing: "border-box",
                                                    flex: "1 1 0%",
                                                    textAlign: "left",
                                                }}
                                            >
                                                Tổng quan
                                            </span>
                                            <svg
                                                className="relative top-[3px]"
                                                height="1em"
                                                width="1em"
                                                fill="currentColor"
                                                stroke="currentColor"
                                                strokeWidth="0"
                                                viewBox="0 0 512 512"
                                                xmlns="http://www.w3.org/2000/svg"

                                                style={{
                                                    border: "0px solid rgb(229, 231, 235)",
                                                    boxSizing: "border-box",
                                                    display: "block",
                                                    verticalAlign: "middle",
                                                    position: "relative",
                                                    top: "3px",
                                                    transform: visible ? 'rotate(0deg)' : 'rotate(-90deg)',
                                                    transition: 'transform 0.3s ease',
                                                }}
                                            >
                                                <path
                                                    d="M96 235h320v42H96z"
                                                    style={{
                                                        border: "0px solid rgb(229, 231, 235)",
                                                        boxSizing: "border-box",
                                                    }}
                                                />

                                            </svg>
                                        </button>
                                    </h3>
                                    {visible && (
                                            <div>
                                                {/* Nội dung cần collapse */}
                                                <p>{ProviderDetail?.description}</p>
                                            </div>
                                    )}

<h3
                                        className="text-para c-md:text-heading-5 flex py-[20px] c-md:py-[24px] border-b font-custom-regular accordion-heading border-transparent"
                                        style={{
                                            border: "0px solid rgb(229, 231, 235)",
                                            boxSizing: "border-box",
                                            margin: "0px",
                                            display: "flex",
                                            borderBottomWidth: "1px",
                                            borderColor: "rgba(0, 0, 0, 0)",
                                            paddingTop: "24px",
                                            paddingBottom: "24px",
                                            fontSize: "20px",
                                            lineHeight: 1.3,
                                            fontFamily: "BuenosAiresVN, sans-serif",
                                            fontWeight: 400,
                                        }}
                                    >
                                        <button
                                            className="flex w-full gap-[8px]"
                                            aria-label="Collapse Tổng quan "
                                            onClick={() => setVisible3(!visible3)}
                                            aria-expanded={visible3}
                                            aria-controls="collapseWidthExample"
                                            style={{
                                                border: "0px solid rgb(229, 231, 235)",
                                                boxSizing: "border-box",
                                                margin: "0px",
                                                padding: "0px",
                                                fontSize: "100%",
                                                lineHeight: "inherit",
                                                color: "inherit",
                                                textTransform: "none",
                                                appearance: "button",
                                                backgroundColor: "initial",
                                                backgroundImage: "none",
                                                cursor: "pointer",
                                                fontFamily: "BuenosAiresVN, sans-serif",
                                                fontWeight: 400,
                                                display: "flex",
                                                width: "100%",
                                                gap: "8px",
                                            }}
                                        >
                                            <span
                                                className="flex-1 text-left"
                                                style={{
                                                    border: "0px solid rgb(229, 231, 235)",
                                                    boxSizing: "border-box",
                                                    flex: "1 1 0%",
                                                    textAlign: "left",
                                                }}
                                            >
                                                Cơ Cấu Khoa
                                            </span>
                                            <svg
                                                className="relative top-[3px]"
                                                height="1em"
                                                width="1em"
                                                fill="currentColor"
                                                stroke="currentColor"
                                                strokeWidth="0"
                                                viewBox="0 0 512 512"
                                                xmlns="http://www.w3.org/2000/svg"

                                                style={{
                                                    border: "0px solid rgb(229, 231, 235)",
                                                    boxSizing: "border-box",
                                                    display: "block",
                                                    verticalAlign: "middle",
                                                    position: "relative",
                                                    top: "3px",
                                                    transform: visible3 ? 'rotate(0deg)' : 'rotate(-90deg)',
                                                    transition: 'transform 0.3s ease',
                                                }}
                                            >
                                                <path
                                                    d="M96 235h320v42H96z"
                                                    style={{
                                                        border: "0px solid rgb(229, 231, 235)",
                                                        boxSizing: "border-box",
                                                    }}
                                                />

                                            </svg>
                                        </button>
                                    </h3>
                                    {visible3 && (
                                                   <div>
                                                   <p>{ProviderDetail.info}</p>
                                               </div>
                                    )}

                                </div>
                            </div>
                        </>
                    }
                </Row>
            }
        </div>
    )
}
export default ClientProviderDetailPage;