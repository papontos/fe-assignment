import React, { useEffect, useState } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-dropdown/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Col, Form, Row } from "react-bootstrap";
import { search } from "./Api";
import toCurrencyItem from "./Components/CurrencyItem";

function App() {
  const [expandedRow, setExpandedRow] = useState(null);
  const periodOptions = ["Transmission"];
  const defaultPeriodOption = periodOptions[0];

  const statusOptions = ["Waiting"];
  const defaultStatusOption = statusOptions[0];

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const searchTable = () => {};

  const data = search();
  const [dataSet, setDataSet] = useState(data);
  const [headerList, setHeaderList] = useState([
    { display: "Account", collaspe: false },
    { display: "Operation", collaspe: false },
    { display: "Symbol", collaspe: false },
    { display: "Description", collaspe: true },
    { display: "Qty", collaspe: true },
    { display: "Filled City", collaspe: true },
    { display: "Price", collaspe: true },
    { display: "Status", collaspe: false },
    { display: "Date", collaspe: true },
    { display: "Expiration", collaspe: true },
    { display: "No. Ref.", collaspe: true },
    { display: "Ext. Ref.", collaspe: true },
  ]);

  // useEffect(() => {
  //   if (window.innerWidth <= 820) {
  //     setHeaderList(["Account", "Operation", "Symbol", "Status"]);
  //   }
  // }, []);

  return (
    <div className="search-page-wrapper">
      <Form className="custom-form ">
        <Row className="form-search-row g-0">
          <Col md="2">
            <div className="title">Search</div>
            <div className="result">
              Search results: <span className="result-count">123</span>
            </div>
          </Col>
          <Col className="search-options">
            <label for="status">Period</label>
            <Form.Select
              options={periodOptions}
              name="period"
              value={defaultPeriodOption}
              placeholder="Select period"
            />

            <label for="status">Status</label>
            <Form.Select
              options={statusOptions}
              name="status"
              value={defaultStatusOption}
              placeholder="Select an option"
            />

            <label for="from">From:</label>
            <DatePicker
              selected={startDate}
              name="from"
              onChange={(date) => setStartDate(date)}
            />

            <label for="to">To:</label>
            <DatePicker
              selected={endDate}
              name="to"
              onChange={(date) => setEndDate(date)}
            />

            <Button className="search-btn" onClick={searchTable()}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      <table class="table result-table">
        <thead>
          <tr>
            <th></th>
            {headerList.map((head) => (
              <th className={head.collaspe ? "collapsable" : ""}>
                {head.display}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dataSet.map((listValue, index) => {
            return (
              <React.Fragment key={listValue.account}>
                <tr
                  data-toggle="collapse"
                  data-target="#demo1"
                  class="accordion-toggle"
                >
                  <td>
                    <button
                      class={`btn btn-default btn-xs ${
                        expandedRow === listValue.account ? "action-arrow" : ""
                      }`}
                      onClick={() =>
                        expandedRow === listValue.account
                          ? setExpandedRow(null)
                          : setExpandedRow(listValue.account)
                      }
                    >
                      {">"}
                    </button>
                  </td>
                  <td className="blue">{listValue.account}</td>
                  <td>{listValue.operation}</td>
                  <td className="bold">{listValue.symbol}</td>
                  <td className="collapsable">{listValue.desc}</td>
                  <td className="collapsable">{listValue.qty}</td>
                  <td className="collapsable">{listValue.filledQty}</td>
                  <td className="collapsable">
                    {toCurrencyItem(listValue.price, "USD", false)}
                  </td>
                  <td>{listValue.status}</td>
                  <td className="collapsable">{listValue.date}</td>
                  <td className="collapsable">{listValue.expiration}</td>
                  <td className="collapsable">{listValue.noRef}</td>
                  <td className="collapsable">{listValue.extRef}</td>
                  <td>
                    <Button className="option-btn">...</Button>
                  </td>
                </tr>
                <tr
                  class={`hiddenRow ${
                    expandedRow === listValue.account ? "show" : ""
                  }`}
                >
                  <td className="summary-detail-wrapper" colSpan="14">
                    <div className="detail-header">
                      <div className="account-info">
                        <div className="account-info-title">
                          Fisrt Name Last Name (10103ZA - US Margin)
                        </div>
                        <Button className="review-detail-btn">
                          Full review details
                        </Button>
                        <div className="action-btn-group">
                          <Button className="default-btn">Accept</Button>
                          <Button className="reject-btn">Reject</Button>
                        </div>
                      </div>
                      <Row className="w-100 mb-2">
                        <Col md="3">
                          <span className="info-item">
                            Net Amount:
                            <span>{toCurrencyItem(listValue.price)}</span>
                          </span>
                        </Col>
                        <Col md="3">
                          <span className="info-item">
                            Price:
                            <span>{listValue.price}</span>
                          </span>
                        </Col>
                        <Col md="3">
                          <span className="info-item">
                            Exchange Rate:
                            <span>{listValue.exchangeRate}</span>
                          </span>
                        </Col>
                        <Col md="3">
                          <span className="info-item">
                            O/S Limit:
                            <span>{listValue.osLimit}</span>
                          </span>
                        </Col>
                        <Col></Col>
                      </Row>
                      <Row className="w-100 mb-3">
                        <Col md="3">
                          <span className="info-item">
                            Reference Number:
                            <span>{listValue.noRef}</span>
                          </span>
                        </Col>
                        <Col md="3">
                          <span className="info-item">
                            Date/Time:
                            <span>{listValue.date}</span>
                          </span>
                        </Col>
                        <Col md="3">
                          <span className="info-item">
                            Telephone:
                            <span>{listValue.telephone}</span>
                          </span>
                        </Col>
                        <Col md="3">
                          <span className="info-item">
                            User ID:
                            <span>{listValue.userId}</span>
                          </span>
                        </Col>
                      </Row>
                    </div>
                    <div class="warning">
                      <div className="warning-title">Warning(s)</div>
                      <ul>
                        <li>
                          to trade this security in this account, a currency
                          conversion will be made at the current rate.
                        </li>
                        <li>A similar order has already been submitted.</li>
                        <li>
                          Your transaction will be preccessed the following
                          business day.
                        </li>
                        <li>
                          It is not possible to calculate the buying power of
                          this order.
                        </li>
                        <li>
                          A cancellation will not be possible during business
                          hours on market orderrs. You can call a representative
                          for more information.
                        </li>
                        <li>
                          For the above-mentioned reason(s),your order will be
                          processed by one of our representatives.
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
