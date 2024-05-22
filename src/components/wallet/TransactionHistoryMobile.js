import { useTheme } from "@emotion/react";
import { MenuItem, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { data_limit } from "../../api-manage/ApiRoutes";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import DotSpin from "../DotSpin";
import CustomEmptyResult from "../custom-empty-result";
import nodataimage from "../loyalty-points/assets/Search.svg";
import { CustomSelect, transaction_options } from "../transaction-history";
import TransactionShimmer from "../transaction-history/Shimmer";
export const period_options = [
  {
    label: "Jour",
    value: "day",
  },
  {
    label: "Semaine",
    value: "week",
  },
  {
    label: "Mois",
    value: "month",
  },
  {
    label: "Année",
    value: "year",
  },
];
const TransactionHistoryMobile = ({
  data,
  isLoading,
  page,
  value,
  setValue,
  offset,
  setOffset,
  isFetching,
}) => {
  const [trxData, setTrxData] = useState([]);
  const [period, setPeriod] = useState("day"); // State for period filter
  const [selectedMonth, setSelectedMonth] = useState(""); // State for month filter
  const [selectedYear, setSelectedYear] = useState(""); // State for year filter

  useEffect(() => {
    if (!isLoading) {
      if (offset <= 1) {
        setTrxData(data?.data);
      } else {
        setTrxData([...trxData, ...data?.data]);
      }
    }
  }, [data]);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      if (!isLoading) {
        if (offset * data_limit <= data?.total_size) {
          setOffset((prevState) => prevState + 1);
        }
      }
    }
  }, [inView]);

  const handleChange = (e) => {
    setValue(e.target.value);
    setOffset(1);
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
    setOffset(1);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setOffset(1);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setOffset(1);
  };

  const theme = useTheme();

  const filteredData = (trxData || []).filter((item) => {
    const itemDate = moment(item?.created_at);
    if (period === "day") {
      return itemDate.isSame(moment(), 'day');
    } else if (period === "week") {
      return itemDate.isSame(moment(), 'week');
    } else if (period === "month" && selectedMonth && selectedYear) {
      return itemDate.isSame(`${selectedYear}-${selectedMonth}`, 'month');
    } else if (period === "year" && selectedYear) {
      return itemDate.isSame(selectedYear, 'year');
    }
    return true;
  });
  return (
    <CustomStackFullWidth>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        mt={2}
        mb={2}
      >
        <Typography fontSize="14px" fontWeight="700" py="1rem">
          {t("Transaction History")}
        </Typography>
        {page != "loyalty" && (
          <CustomSelect value={value} onChange={(e) => handleChange(e)}>
            {transaction_options?.map((item, i) => (
              <MenuItem key={i} value={item?.value}>
                {item?.label}
              </MenuItem>
            ))}
          </CustomSelect>
        )}
           <CustomSelect value={period} onChange={handlePeriodChange}>
            {period_options?.map((item, i) => (
              <MenuItem key={i} value={item?.value}>
                {t(item?.label)}
              </MenuItem>
            ))}
          </CustomSelect>
          {(period === "month" || period === "year") && (
            <CustomSelect value={selectedYear} onChange={handleYearChange}>
              {/* Populate year options dynamically */}
              {[...Array(10).keys()].map((i) => {
                const year = moment().subtract(i, 'years').format('YYYY');
                return (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                );
              })}
            </CustomSelect>
          )}
            {period === "month" && (
            <CustomSelect value={selectedMonth} onChange={handleMonthChange}>
              {moment.months().map((month, i) => (
                <MenuItem key={i} value={String(i + 1).padStart(2, '0')}>
                  {month}
                </MenuItem>
              ))}
            </CustomSelect>
          )}
      </Stack>
      {filteredData?.length > 0 &&
        filteredData?.map((item) => {
          return (
            <Stack
              key={item?.id}
              spacing={1.8}
              padding="14px 11px"
              backgroundColor={theme.palette.neutral[300]}
              borderRadius="10px"
              marginBottom="10px"
            >
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  color={
                    item?.debit
                      ? (theme) => theme.palette.error.main
                      : (theme) => theme.palette.primary.main
                  }
                  fontWeight="500"
                  fontSize="12px"
                >
                  {page === "loyalty"
                    ? item?.transaction_type === "point_to_wallet"
                      ? item?.debit
                      : item?.credit
                    : getAmountWithSign(
                        item?.transaction_type === "point_to_wallet"
                          ? item?.debit
                          : item?.credit + item?.admin_bonus
                      )}
                </Typography>
                <Typography fontSize="11px" color={theme.palette.neutral[400]}>
                  {item?.created_at}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                {item?.transaction_type === "add_fund" ? (
                  <Typography fontSize="12px">
                    {t("added via")}
                    {t(item?.reference).replaceAll("_", " ")} ({t("bonus")}:
                    {getAmountWithSign(item?.admin_bonus)})
                  </Typography>
                ) : (
                  <Typography fontSize="12px">
                    {t(item?.transaction_type).replaceAll("_", " ")}
                  </Typography>
                )}
                <Typography
                  fontSize="10px"
                  color={
                    item?.transaction_type === "order_place"
                      ? theme.palette.error.main
                      : theme.palette.primary.main
                  }
                >
                  {" "}
                  {item?.transaction_type === "order_place"
                    ? t("debit")
                    : t("credit")}
                </Typography>
              </Stack>
            </Stack>
          );
        })}
      {!isLoading && isFetching && (
        <Stack sx={{ marginTop: "2rem" }}>
          <DotSpin />
        </Stack>
      )}
      <Box ref={ref} sx={{ height: "5px" }} />

      {trxData?.length == 0 && (
        <CustomEmptyResult
          image={nodataimage}
          width="128px"
          height="128px"
          label="No transaction found"
        />
      )}
      {isLoading && <TransactionShimmer />}
    </CustomStackFullWidth>
  );
};

export default TransactionHistoryMobile;
