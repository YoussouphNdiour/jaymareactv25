import React, { useState } from "react";
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
import CustomPhoneInput from "../../custom-component/CustomPhoneInput";
import { Grid, Skeleton, Stack, Typography } from "@mui/material";
import CustomTextFieldWithFormik from "../../form-fields/CustomTextFieldWithFormik";
import FormSubmitButton from "../../profile/FormSubmitButton";
import { getLanguage } from "../../../helper-functions/getLanguage";
import { useFormik } from "formik";
import axios from "axios";

import toast from "react-hot-toast";

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
    totalAmount
  } = props;

  const { offlineInfoStep } = useSelector((state) => state.offlinePayment);
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
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
  const handleSubmit = async () => {
    // Faites quelque chose avec les données du formulaire (data)
    const response = await makePayment(addAddressFormik.values.otp, addAddressFormik.values.number, Math.round(totalAmount));
    console.log('Formulaire soumis avec:', response);

  };
  const [numeroClient, setNumeroClient] = useState('');
  const [otp, setOtp] = useState('');
  const lanDirection = getLanguage() ? getLanguage() : "ltr";
  const token = localStorage.getItem("token");

  const primaryColor = theme.palette.primary.main;
  const addAddressFormik = useFormik({
    initialValues: {
      otp: "",
      number: "",
    },
 
  });
  const nameHandler = (value) => {
    addAddressFormik.setFieldValue("otp", value);
  };
  const numberHandler = (value) => {
    addAddressFormik.setFieldValue("number", value);
  };
  const initCountry= 'senegal';





  
  async function makePayment(otp, numeroClient, amount) {
    const url = "https://api.silex.sn/app/api/one-step-payment";  
    const CODE="520309";
    const payload = 
    {
      otp,
      amount,
     "numero_client":numeroClient.substring(3),
     CODE
  };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',

        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
      console.log("Réponse du serveur:", result);
  
      if (result.status === "SUCCESS") {
        toast.success(t("commande payée avec succés"));
        await props.placeOrder();
        console.log("Props.placeOrder:", props.placeOrder);
        
      } else {
        // Logique en cas d'échec
        return toast.error(result?.detail ? result?.detail : result?.title);
      }
    } catch (error) {
      toast.error("Erreur lors de la requête de paiement");

      throw error;
    }
  }













  return (
    <CustomStackFullWidth alignItems="center" spacing={2} mt=".5rem">
      <FormGroup>
      <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleChange} />}
          label={
            <CustomTypography fontSize="18px">
              {(`Pour finaliser la commande Tapez le `)}{" "}
              <Link
                href="tel:#144#391#"
                style={{ color: primaryColor }}
              >
                {("#144#391#")}
              </Link>{" "}
              {/* {t("")} */}
             {/* <Link href="#" style={{ color: primaryColor }}>
                {" "} */}
                {t("entrer le code temporaire OTP")}
              {/* </Link> */}
            </CustomTypography>
          }
        />
        <CustomStackFullWidth p="2rem" minHeight="300px" alignItems="center" justifyContent="center">
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <CustomTextFieldWithFormik
                  required="true"
                  type="text"
                  label={t("OTP")}
                  touched={addAddressFormik.touched.otp}
                  //errors={addAddressFormik.errors.otp}
                  fieldProps={addAddressFormik.getFieldProps("otp")}
                  onChangeHandler={nameHandler}
                  value={addAddressFormik.values.otp}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <CustomPhoneInput
                  value={addAddressFormik.values.number}
                  onHandleChange={numberHandler}
                  initCountry={initCountry}
                  touched={addAddressFormik.touched.number}
                  //errors={addAddressFormik.errors.number}
                  rtlChange="true"
                  lanDirection={lanDirection}
                  height="45px"
                />
              </Grid>
            
            </Grid>
          </form>
        </CustomStackFullWidth>
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
          onClick={handleSubmit}
          loading={orderLoading}
          disabled={!checked}
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
          disabled={!checked}
        >
          {t("Confirm Order")}
        </LoadingButton>
      )}
    </CustomStackFullWidth>
  );
};

PlaceOrder.propTypes = {};

export default PlaceOrder;
