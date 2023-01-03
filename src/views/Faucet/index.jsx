import React from "react";
import { Paper, Box, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import styles from "./style.module.scss";
import BetaIcon from "../../assets/icons/union.svg";
import TokenIcon from "../../assets/images/con-token.svg?component";
import { useForm } from "react-hook-form";
import FormInputText from "../../components/FormInputText";
import NumberFormat from "react-number-format";
import useToast from "../../hooks/useToast";
import useCurrnetProvider from "../../hooks/useCurrentProvider";
import numFormat from "../../utils/numFormat";

const price = 1000;

const useStyles = makeStyles((theme) => ({
  beta: {
    backgroundImage: `url(${BetaIcon})`,
    backgroundSize: "90%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    padding: "15px 30px",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    width: 65,
    height: 65,
    marginTop: 20,
    marginLeft: 5,
  },
  price: {
    width: "100%",
    backgroundColor: theme.palette.common.white,
    transition: "0.4s ease all",
    borderRadius: 7,
    cursor: "pointer",
    boxShadow: "-1px 1px 16px 7px rgba(0, 0, 0, 0.06)",
    padding: "10px 15px",
  },
  token: {
    width: 27,
    height: 27,
  },
  btn: {
    marginTop: 70,
  },
}));

const Faucet = () => {
  const classes = useStyles();
  const { toast } = useToast();
  const { faucet } = useCurrnetProvider();
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const inputAccount = data.account;

    if (inputAccount?.length !== 42)
      return toast.error("Invalid wallet address!");

    try {
      const res = await faucet(inputAccount);

      if (res?.success) return toast.success(res.message);
      else return toast.error(res.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper className={styles.container}>
      <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <Box className={classes.beta}>
          <Typography
            variant="placeholder"
            fontWeight={700}
            mb={1}
            color="common.white"
          >
            Only for Beta TestNet
          </Typography>
        </Box>
        <TokenIcon className={classes.icon} />
        <Box className={styles.wrapper} mt={3}>
          <Typography
            variant="h2"
            fontWeight={700}
            fontSize="40px!important"
            color="grey.1400"
          >
            CYCON Faucet
          </Typography>
          <Typography variant="placeholder" fontWeight={600} color="grey.1000">
            You can get test 1000 CYCON token for each wallet.
          </Typography>
        </Box>
        <Box className={styles.form}>
          <Box className={styles.field}>
            <Typography
              variant="placeholder"
              fontWeight={600}
              display="flex"
              ml={1}
              mb={1}
            >
              Account Address <Typography color="primary">*</Typography>
            </Typography>
            <FormInputText
              artistInput
              control={control}
              name="account"
              label="Please put your wallet address here"
            />
          </Box>
          <Box className={styles.field}>
            <Typography
              variant="placeholder"
              fontWeight={600}
              display="flex"
              ml={1}
              mb={1}
            >
              CYCON Balance
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              className={classes.price}
            >
              <Typography fontWeight={600} fontSize="22px">
                <NumberFormat
                  value={numFormat(price)}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </Typography>
              <Box display="flex" alignItems="center">
                <TokenIcon className={classes.token} />
                <Typography fontWeight={600} ml={1} variant="placeholder">
                  CYCON
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Button variant="contained" type="submit" className={classes.btn}>
          Run Faucet
        </Button>
      </form>
    </Paper>
  );
};

export default Faucet;
