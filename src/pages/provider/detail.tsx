import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { LOCATION_LIST, convertSlug, getLocationName } from '@/config/utils';
import { IProvider, IScholarship } from "@/types/backend";
import { callFetchProviderById } from "@/config/api";
import { EnvironmentOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { callFetchScholarshipofProvider } from "@/config/api";
import styles from 'styles/client.module.scss';
import { Card, Col, Divider, Row, Skeleton } from "antd";
import DetailButton from "./buttondetail";
import { Provider } from "react-redux";


const ClientProviderDetailPage = (props: any) => {
    const [ProviderDetail, setProviderDetail] = useState<IProvider | null>(null);
    const [Scholarship, setScholarship] = useState<IScholarship[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [visible, setVisible] = useState(true)
    const [visible2, setVisible2] = useState(true)
    const [visible3, setVisible3] = useState(false)
    const [visible4, setVisible4] = useState(false)
    let location = useLocation();
    const navigate = useNavigate();
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

    useEffect(() => {
        const detailscholar = async () => {
            if (id) {
                setIsLoading(true)
                const res = await callFetchScholarshipofProvider(id);
                if (res?.data && Array.isArray(res.data)) {
                    setScholarship(res.data);
                    console.log("data ne", res.data)
                }
                setIsLoading(false)
            }
        }
        detailscholar();
    }, [id]);
    const handleViewDetailScholarship = (item: IScholarship) => {
        const slug = convertSlug(item.name);

        navigate(`/Scholarship/${slug}?id=${item._id}`)
    }
    return (
        <div style={{paddingTop:'30px'}}>
            <section
                id="university-details-banner"
                className="relative z-10 pt-[20px] pb-[24px] c-lg:py-[40px] c-lg:h-[520px] h-[360px] before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-r before:from-black/70 before:to-black/10"
                style={{
                    border: "0px solid rgb(229, 231, 235)",
                    boxSizing: "border-box",
                    position: "relative",
                    zIndex: 10,
                    height: "520px",
                    paddingTop: "40px",
                    paddingBottom: "40px",
                }}
            >
                <img
                    className="w-full h-full object-cover absolute top-0 left-0"
                    height={520}
                    width={2543}
                    alt="subject banner"
                    src={`${import.meta.env.VITE_BACKEND_URL}/images/background/${ProviderDetail?.background}`}
                    style={{
                        border: "0px solid rgb(229, 231, 235)",
                        boxSizing: "border-box",
                        display: "block",
                        verticalAlign: "middle",
                        maxWidth: "100%",
                        position: "absolute",
                        left: "0px",
                        top: "0px",
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        color: "transparent",
                    }}
                />
                <div
                    style={{
                        border: "0px solid rgb(229, 231, 235)",
                        boxSizing: "border-box",
                    }}
                >

                </div>
                <div
                    className="max-w-container mx-auto relative z-20 flex flex-col h-full px-[16px] c-xs:px-[24px] c-xl2:px-0"
                    style={{
                        border: "0px solid rgb(229, 231, 235)",
                        boxSizing: "border-box",
                        position: "relative",
                        zIndex: 20,
                        marginLeft: "auto",
                        marginRight: "auto",
                        display: "flex",
                        height: "100%",
                        maxWidth: "1216px",
                        flexDirection: "column",
                        paddingLeft: "0px",
                        paddingRight: "0px",
                    }}
                >
                    <div
                        className="max-w-[750px]"
                        style={{
                            border: "0px solid rgb(229, 231, 235)",
                            boxSizing: "border-box",
                            maxWidth: "750px",
                        }}
                    >
                        <ul
                            className="hidden c-lg:inline-block font-custom-regular text-small breadcrumbs"
                            style={{
                                border: "0px solid rgb(229, 231, 235)",
                                boxSizing: "border-box",
                                listStyle: "none",
                                margin: "0px",
                                padding: "0px",
                                fontSize: "14px",
                                lineHeight: 1.4,
                                display: "inline-block",
                                fontFamily: "BuenosAiresVN, sans-serif",
                                fontWeight: 400,
                            }}
                        >
                            <li
                                className="text-neutral-1 inline"
                                style={{
                                    border: "0px solid rgb(229, 231, 235)",
                                    boxSizing: "border-box",
                                    display: "inline",
                                    color: "rgb(28 31 42/1)",
                                }}
                            >
                                <span
                                    className="text-white"
                                    style={{
                                        border: "0px solid rgb(229, 231, 235)",
                                        boxSizing: "border-box",
                                        color: "rgb(255 255 255/1)",
                                    }}
                                >
                                    {ProviderDetail?.name}
                                </span>
                            </li>
                        </ul>
                        <ul
                            className="inline-block c-lg:hidden text-x-small font-custom-regular breadcrumbs"
                            style={{
                                border: "0px solid rgb(229, 231, 235)",
                                boxSizing: "border-box",
                                listStyle: "none",
                                margin: "0px",
                                padding: "0px",
                                fontSize: "12px",
                                lineHeight: 1.3,
                                display: "none",
                                fontFamily: "BuenosAiresVN, sans-serif",
                                fontWeight: 400,
                            }}
                        >
                        </ul>
                    </div>
                    <div
                        className="mt-auto"
                        style={{
                            border: "0px solid rgb(229, 231, 235)",
                            boxSizing: "border-box",
                            marginTop: "auto",
                        }}
                    >
                        <div
                            className="c-lg:flex-row items-start c-lg:items-center flex-col flex gap-[20px] c-lg:gap-[24px]"
                            style={{
                                border: "0px solid rgb(229, 231, 235)",
                                boxSizing: "border-box",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "24px",
                            }}
                        >
                            <img
                                className="c-lg:w-[72px] c-lg:h-[72px] shrink-0 object-contain rounded-[12px] overflow-hidden bg-white items-center w-[60px] h-[60px] c-lg:flex"
                                height={72}
                                width={72}
                                alt="uni logo"
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/Provider/${ProviderDetail?.logo}`}
                                style={{
                                    border: "0px solid rgb(229, 231, 235)",
                                    boxSizing: "border-box",
                                    verticalAlign: "middle",
                                    maxWidth: "100%",
                                    flexShrink: 0,
                                    alignItems: "center",
                                    overflow: "hidden",
                                    borderRadius: "12px",
                                    backgroundColor: "rgb(255 255 255/1)",
                                    objectFit: "contain",
                                    display: "flex",
                                    height: "72px",
                                    width: "72px",
                                    color: "transparent",
                                }}
                            />
                            <div
                                style={{
                                    border: "0px solid rgb(229, 231, 235)",
                                    boxSizing: "border-box",
                                }}
                            >
                                <h1
                                    className="text-white c-lg:line-clamp-3 line-clamp-5"
                                    style={{
                                        border: "0px solid rgb(229, 231, 235)",
                                        boxSizing: "border-box",
                                        margin: "0px",
                                        fontSize: "48px",
                                        lineHeight: 1.3,
                                        fontFamily: "BuenosAiresVN, sans-serif",
                                        fontWeight: 700,
                                        color: "rgb(255 255 255/1)",
                                        overflow: "hidden",
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: "3",
                                    }}
                                >
                                    {ProviderDetail?.name}
                                </h1>
                                <h2
                                    className="text-white font-custom-regular text-heading-5 hidden c-lg:block mt-[12px]"
                                    style={{
                                        border: "0px solid rgb(229, 231, 235)",
                                        boxSizing: "border-box",
                                        margin: "0px",
                                        marginTop: "12px",
                                        fontSize: "20px",
                                        lineHeight: 1.3,
                                        color: "rgb(255 255 255/1)",
                                        display: "block",
                                        fontFamily: "BuenosAiresVN, sans-serif",
                                        fontWeight: 400,
                                    }}
                                />
                            </div>
                        </div>
                        <div
                            className="flex w-full gap-[12px] c-lg:gap-[20px] mt-[16px] c-lg:mt-[32px]"
                            style={{
                                border: "0px solid rgb(229, 231, 235)",
                                boxSizing: "border-box",
                                display: "flex",
                                width: "100%",
                                marginTop: "32px",
                                gap: "20px",
                            }}
                        >
                            <a
                                className="btn btn--lg btn--secondary-gradient hidden c-lg:block min-w-[250px] text-center"
                                href="#"
                                style={{
                                    border: "0px solid rgb(229, 231, 235)",
                                    boxSizing: "border-box",
                                    textDecoration: "inherit",
                                    cursor: "pointer",
                                    textDecorationLine: "none",
                                    borderRadius: "108px",
                                    borderWidth: "1px",
                                    borderColor: "rgb(8 116 231/1)",
                                    backgroundColor: "rgb(214, 65, 5)",
                                    transitionProperty: "all",
                                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                                    transitionDuration: "0.15s",
                                    padding: "12px 28px",
                                    fontSize: "18px",
                                    lineHeight: "24px",
                                    minWidth: "250px",
                                    textAlign: "center",
                                    overflow: "hidden",
                                    borderStyle: "none",
                                    position: "relative",
                                    // backgroundImage: "linear-gradient(to right,#429f06 ,#008260)",
                                    display: "block",
                                    fontFamily: "BuenosAiresVN, sans-serif",
                                    fontWeight: 400,
                                    color: "rgb(255 255 255/1)",
                                }}
                            >
                                <span
                                    className="btn__text"
                                    style={{
                                        border: "0px solid rgb(229, 231, 235)",
                                        boxSizing: "border-box",
                                        position: "relative",
                                        zIndex: 1,
                                    }}
                                >
                                    Nộp Đơn Ngay
                                </span>
                            </a>
                            <a
                                className="btn btn--lg btn--white-outline hidden c-lg:block"
                                href="#"
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
                                    borderColor: "rgb(255 255 255/1)",
                                    color: "black",
                                    backgroundColor: "white",
                                    display: "block",
                                    fontFamily: "BuenosAiresVN, sans-serif",
                                    fontWeight: 400,
                                }}
                            >
                                Xem tất cả các khóa học
                            </a>
                            <button
                                className="btn btn--lg btn--white-outline"
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
                                    borderColor: "rgb(255 255 255/1)",
                                    color: "rgb(255 255 255/1)",
                                    backgroundColor: "initial",
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
                    </div>
                </div>
            </section>
            <div className={`${styles["container"]} ${styles["detail-job-section"]}`}>
                {isLoading ?
                    <Skeleton />
                    :
                    <Row gutter={[20, 20]}>
                        {ProviderDetail && ProviderDetail._id &&
                            <>
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
                                                Thành Phố
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
                                                {ProviderDetail?.city}

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
                                                                src={`${import.meta.env.VITE_BACKEND_URL}/images/gallery/` + image}
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
                                                <p>{ProviderDetail.part}</p>
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
                                                    Thông Tin Thêm
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
                                                onClick={() => setVisible4(!visible4)}
                                                aria-expanded={visible4}
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
                                                    Học bổng hiện có
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
                                                        transform: visible4 ? 'rotate(0deg)' : 'rotate(-90deg)',
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
                                        <Row gutter={[20, 20]}>
                                            {visible4 && (
                                                Scholarship && Scholarship.map(item => (
                                                    <Col span={24} md={12} key={item._id}>
                                                        <Card size="small" title={null} hoverable onClick={() => handleViewDetailScholarship(item)}>
                                                            <div className={styles["card-Scholarship-content"]}>
                                                                <div className={styles["card-Scholarship-left"]}>
                                                                    <img
                                                                        alt="example"
                                                                        src={`${import.meta.env.VITE_BACKEND_URL}/images/Provider/${item?.provider?.logo}`}
                                                                        style={{ width: '70px', height: '70px' }}
                                                                    />
                                                                </div>
                                                                <div className={styles["card-Scholarship-right"]}>
                                                                    <div className={styles["Scholarship-title"]} style={{ fontWeight: 600 }}>{item.name}</div>
                                                                    <div className={styles["Scholarship-location"]}>
                                                                        <EnvironmentOutlined style={{ color: '#58aaab' }} /> {item.location}
                                                                    </div>
                                                                    <div>
                                                                        <ThunderboltOutlined style={{ color: 'orange' }} /> {item.level?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    </Col>
                                                ))
                                            )}
                                        </Row>
                                    </div>
                                </div>
                            </>
                        }
                    </Row>
                }
            </div>
        </div>

    )
}
export default ClientProviderDetailPage;