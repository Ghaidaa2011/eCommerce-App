import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useRegister from "@hooks/useRegister";
import { Heading } from "@components/common";
import { Input } from "@components/form";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";

const Register = () => {
  const {
    loading,
    error,
    accessToken,
    formErrors,
    emailAvailabilityStatus,
    submitForm,
    register,
    handleSubmit,
    emailOnBlurHandler,
  } = useRegister();
  const { t } = useTranslation("global");
  if (accessToken) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Heading title={t("user.registration")} />
      <Row>
        <Col md={6} className="mx-auto">
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label={t("user.first-name")}
              name="firstName"
              register={register}
              error={formErrors.firstName?.message}
            />
            <Input
              label={t("user.last-name")}
              name="lastName"
              register={register}
              error={formErrors.lastName?.message}
            />
            <Input
              label={t("user.email")}
              name="email"
              register={register}
              onBlur={emailOnBlurHandler}
              error={
                formErrors.email?.message
                  ? formErrors.email?.message
                  : emailAvailabilityStatus === "notAvailable"
                  ? t("user.email-in-use")
                  : emailAvailabilityStatus === "failed"
                  ? t("user.server-error")
                  : ""
              }
              formText={
                emailAvailabilityStatus === "checking"
                  ? t("user.checking-email")
                  : ""
              }
              success={
                emailAvailabilityStatus === "available"
                  ? t("user.email-available")
                  : ""
              }
              disabled={emailAvailabilityStatus === "checking" ? true : false}
            />
            <Input
              type="password"
              label={t("user.password")}
              name="password"
              register={register}
              error={formErrors.password?.message}
            />
            <Input
              type="password"
              label={t("user.confirm-password")}
              name="confirmPassword"
              register={register}
              error={formErrors.confirmPassword?.message}
            />
            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={
                emailAvailabilityStatus === "checking" ||
                emailAvailabilityStatus === "notAvailable" ||
                emailAvailabilityStatus === "failed" ||
                loading === "pending"
              }
            >
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner>{" "}
                  {t("user.loading")}...
                </>
              ) : (
                t("user.submit")
              )}
            </Button>
            {error && (
              <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;
