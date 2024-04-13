// import { useState } from "react";
// import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
// import { useTranslation } from "react-i18next";
// import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
// // import { CustomTypographyGray } from '../../error/Errors.style'
// // import { CustomTypography } from '../../custom-tables/Tables.style'
// import LoadingButton from "@mui/lab/LoadingButton";
// import { CustomTypography } from "../../landing-page/hero-section/HeroSection.style";
// import Link from "next/link";
// import { useTheme } from "@emotion/react";
// import { useDispatch, useSelector } from "react-redux";
// import { setOfflineInfoStep } from "../../../redux/slices/offlinePaymentData";
// import { useRouter } from "next/router";
// import CustomPhoneInput from "../../custom-component/CustomPhoneInput";
// import { Grid, Skeleton, Stack, Typography } from "@mui/material";
// import CustomTextFieldWithFormik from "../../form-fields/CustomTextFieldWithFormik";
// import FormSubmitButton from "../../profile/FormSubmitButton";
// import { getLanguage } from "../../../helper-functions/getLanguage";
// import { useFormik } from "formik";
// import axios from "axios";
// import CustomImageContainer from "../../CustomImageContainer";
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';

// import toast from "react-hot-toast";

// const PlaceOrder = (props) => {
//   const {
//     placeOrder,
//     orderLoading,
//     zoneData,
//     isStoreOpenOrNot,
//     storeData,
//     isSchedules,
//     page,
//     storeCloseToast,
//     totalAmount,
//     id
//   } = props;
//   const [value, setValue] = React.useState(0);

//   const { offlineInfoStep } = useSelector((state) => state.offlinePayment);
//   const { t } = useTranslation();
//   const theme = useTheme();
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const [checked, setChecked] = useState(false);
//   const handleChange = (e) => {
//     setChecked(e.target.checked);
//   };
//   const handleOffline = (e) => {
//     if (storeData?.active) {
//       //checking restaurant or shop open or not
//       if (isSchedules()) {
//         setChecked(e.target.checked);
//         dispatch(setOfflineInfoStep(2));
//         router.push(
//           { pathname: "/checkout", query: { page: page, method: "offline" } },
//           undefined,
//           { shallow: true }
//         );
//       } else {
//         storeCloseToast();
//       }
//     } else {
//       storeCloseToast();
//     }
//   };
//   const handleSubmit = async () => {
//     // Faites quelque chose avec les données du formulaire (data)
//     const response = await makePayment(addAddressFormik.values.otp, addAddressFormik.values.number, Math.round(totalAmount));
//     console.log('Formulaire soumis avec:', response);

//   };
//   const [numeroClient, setNumeroClient] = useState('');
//   const [otp, setOtp] = useState('');
//   const lanDirection = getLanguage() ? getLanguage() : "ltr";
//   const token = localStorage.getItem("token");

//   const primaryColor = theme.palette.primary.main;
//   const addAddressFormik = useFormik({
//     initialValues: {
//       otp: "",
//       number: "",
//     },
 
//   });
//   const nameHandler = (value) => {
//     addAddressFormik.setFieldValue("otp", value);
//   };
//   const numberHandler = (value) => {
//     addAddressFormik.setFieldValue("number", value);
//   };
//   const initCountry= 'SN';
//   async function makePayment(otp, numeroClient, amount) {
//     const url = "https://api.silex.sn/app/api/one-step-payment";  
//     const CODE="520309";
//     const payload = 
//     {
//       otp,
//       amount,
//      "numero_client":numeroClient.substring(3),
//      CODE
//   };
//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           'Access-Control-Allow-Origin': '*',

//         },
//         body: JSON.stringify(payload),
//       });
  
//       const result = await response.json();
//       console.log("Réponse du serveur:", result);
//       if(id==null){
//         toast.error("redémarrer l'application");
//       }
//       else{
//         if (result.status === "SUCCESS") {
//           toast.success(t("commande payée avec succés"));
//           await props.placeOrder();
//           console.log("Props.placeOrder:", props.placeOrder);
          
//         } else {
//           // Logique en cas d'échec
//           return toast.error(result?.detail ? result?.detail : result?.title);
//         }
//       }
//     } catch (error) {
//       toast.error("Erreur lors de la requête de paiement");

//       throw error;
//     }
//   }
//   const handleChangePayment = (event, newValue) => {
//     setValue(newValue);
//   };
//   return (
//     <CustomStackFullWidth alignItems="center" spacing={2} mt=".5rem" p="2rem" justifyContent="center">
//       <FormGroup>
//         <Box sx={{ width: '100%', typography: 'body1' }}>
//           <TabContext value={value}>
//             <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//               <TabList onChange={handleChangePayment} aria-label="lab API tabs example">
//                 <Tab 
//                   label="Orange Money" 
//                   value="1"  
//                   icon={
//                     <CustomImageContainer
//                     src="https://apishop.jaymagadegui.sn/storage/app/public/payment_modules/OM.png"
//                     height="63px"
//                     maxWidth="63px"
//                     width="100%"
//                     loading="lazy"
//                     smHeight="50px"  
//                     />
//                   } />
//                 <Tab 
//                   label="Wave" 
//                   value="2" 
//                   icon={
//                     <CustomImageContainer
//                     src="https://apishop.jaymagadegui.sn/storage/app/public/payment_modules/wave.png"
//                     height="63px"
//                     maxWidth="63px"
//                     width="100%"
//                     loading="lazy"
//                     smHeight="50px"  
//                     />
//                   }/>
//               </TabList>
//             </Box>
//             <TabPanel value="1">
//               <FormControlLabel
//                 control={<></>}
//                 label={
//                   <CustomTypography fontSize="18px" p=".5rem">
//                     {(`Pour finaliser la commande Tapez le `)}{" "}
//                     <Link
//                       href="tel:#144#391#"
//                       style={{ color: primaryColor }}
//                     >
//                       {("#144#391#")}
//                     </Link>{" "}
//                     {/* {t("")} */}
//                   {/* <Link href="#" style={{ color: primaryColor }}>
//                       {" "} */}
//                       {t("entrer le code temporaire OTP")}
//                     {/* </Link> */}
//                   </CustomTypography>
//                 } 
//               />
//               <CustomStackFullWidth  minHeight="200px" alignItems="center" justifyContent="center">
//                 <form noValidate onSubmit={handleSubmit}>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12} md={12}>
//                       <CustomTextFieldWithFormik
//                         required="true"
//                         type="text"
//                         label={t("OTP")}
//                         touched={addAddressFormik.touched.otp}
//                         //errors={addAddressFormik.errors.otp}
//                         fieldProps={addAddressFormik.getFieldProps("otp")}
//                         onChangeHandler={nameHandler}
//                         value={addAddressFormik.values.otp}
//                       />
//                     </Grid>
//                     <Grid item xs={12} md={12}>
//                       <CustomPhoneInput
//                         value={addAddressFormik.values.number}
//                         onHandleChange={numberHandler}
//                         initCountry={initCountry}
//                         touched={addAddressFormik.touched.number}
//                         //errors={addAddressFormik.errors.number}
//                         rtlChange="true"
//                         lanDirection={lanDirection}
//                         height="45px"
//                       />
//                     </Grid>
                  
//                   </Grid>
//                 </form>
//               </CustomStackFullWidth>
//             </TabPanel>
//             <TabPanel value="2">
//               <CustomStackFullWidth  minHeight="200px" alignItems="center" justifyContent="center">
//                 <form noValidate onSubmit={handleSubmit}>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12} md={12}>
//                       <CustomPhoneInput
//                         value={addAddressFormik.values.number}
//                         onHandleChange={numberHandler}
//                         initCountry={initCountry}
//                         touched={addAddressFormik.touched.number}
//                         //errors={addAddressFormik.errors.number}
//                         rtlChange="true"
//                         lanDirection={lanDirection}
//                         height="45px"
//                       />
//                     </Grid>
                  
//                   </Grid>
//                 </form>
//               </CustomStackFullWidth>
//             </TabPanel>
//           </TabContext>
//         </Box> 
//         <FormControlLabel
//           control={<Checkbox checked={checked} onChange={handleChange} />}
//           label={
//             <CustomTypography fontSize="12px">
//               {t(`I agree that placing the order places me under`)}{" "}
//               <Link
//                 href="/terms-and-conditions"
//                 style={{ color: primaryColor }}
//               >
//                 {t("Terms and Conditions")}
//               </Link>{" "}
//               {t("&")}
//               <Link href="/privacy-policy" style={{ color: primaryColor }}>
//                 {" "}
//                 {t("Privacy Policy")}
//               </Link>
//             </CustomTypography>
//           }
//         />
//       </FormGroup>
//       {offlineInfoStep === 0 ? (
//         <LoadingButton
//           type="submit"
//           fullWidth
//           variant="contained"
//           onClick={handleSubmit}
//           loading={orderLoading}
//           disabled={!checked}
//         >
//           {t("Place Order")}
//         </LoadingButton>
//       ) : (
//         <LoadingButton
//           // type="submit"
//           fullWidth
//           variant="contained"
//           onClick={handleOffline}
//           loading={orderLoading}
//           disabled={!checked}
//         >
//           {t("Confirm Order")}
//         </LoadingButton>
//       )}
//     </CustomStackFullWidth>
//   );
// };

// PlaceOrder.propTypes = {};

// export default PlaceOrder;


import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
// import { CustomTypographyGray } from '../../error/Errors.style'
// import { CustomTypography } from '../../custom-tables/Tables.style'
import LoadingButton from "@mui/lab/LoadingButton";
import { CustomTypography } from "../../landing-page/hero-section/HeroSection.style";
import Link from "next/link";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { setOfflineInfoStep } from "../../../redux/slices/offlinePaymentData";
import { useRouter } from "next/router";

const PlaceOrder = (props) => {
  const {
    placeOrder,
    orderLoading,
    zoneData,
    isStoreOpenOrNot,
    storeData,
    isSchedules,
    page,
    storeCloseToast,
    delivery_instruction
  } = props;

  const { offlineInfoStep } = useSelector((state) => state.offlinePayment);
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [delivery_instruction_bool, setdelivery_instruction_bool] = useState(true);
  const handleChange = (e) => {
    setChecked(e.target.checked);
  };
  const handleOffline = (e) => {
    if (storeData?.active) {
      //checking restaurant or shop open or not
      if (isSchedules()) {
        setChecked(e.target.checked);
        dispatch(setOfflineInfoStep(2));
        router.push(
          { pathname: "/checkout", query: { page: page, method: "offline" } },
          undefined,
          { shallow: true }
        );
      } else {
        storeCloseToast();
      }
    } else {
      storeCloseToast();
    }
  };
  useEffect(() => {
    if (delivery_instruction ) {
      setdelivery_instruction_bool(true);
    }
    else{
      setdelivery_instruction_bool(false);
    }
    
  }, [delivery_instruction]);
  

  const primaryColor = theme.palette.primary.main;
  return (
    <CustomStackFullWidth alignItems="center" spacing={2} mt=".5rem">
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleChange} />}
          label={
            <CustomTypography fontSize="12px">
              {t(`I agree that placing the order places me under`)}{" "}
              <Link
                href="/terms-and-conditions"
                style={{ color: primaryColor }}
              >
                {t("Terms and Conditions")}
              </Link>{" "}
              {t("&")}
              <Link href="/privacy-policy" style={{ color: primaryColor }}>
                {" "}
                {t("Privacy Policy")}
              </Link>
            </CustomTypography>
          }
        />
      </FormGroup>
      {offlineInfoStep === 0 ? (
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          onClick={placeOrder}
          loading={orderLoading}
          disabled={!checked || !delivery_instruction_bool }
        >
          {t("Place Order")}
        </LoadingButton>
      ) : (
        <LoadingButton
          // type="submit"
          fullWidth
          variant="contained"
          onClick={handleOffline}
          loading={orderLoading}
          disabled={!checked || !delivery_instruction_bool}
        >
          {t("Confirm Order")}
        </LoadingButton>
      )}
    </CustomStackFullWidth>
  );
};

PlaceOrder.propTypes = {};

export default PlaceOrder;

