import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import { Button, Col, Form, Input, message, Radio, Row, Segmented } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { addScreen, updateScreen } from 'api_services/screen_services';
import { useLocation, useNavigate } from 'react-router-dom';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import SectionForm from 'components/SectionForm';

function ScreenForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stateData = useLocation().state;
  const [screen, setScreen] = useState(null);
  const [leftToRightNumbering, setLeftToRightNumbering] = useState("true");
  const [topToBottomNumbering, setTopToBottomNumbering] = useState("true");
  const [sections, setSections] = useState([{ rowNo: 0, name: "Regular" }]);

  useEffect(() => {
    if (stateData.selectedScreen) {
      setScreen(screen);
      setLeftToRightNumbering(screen.leftToRightNumbering);
      setTopToBottomNumbering(screen.topToBottomNumbering);
      setSections(screen.sections);
    }
  }, []);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      //TODO: Check for left to right, top to bottom, sections and add to "values"
      if (stateData.formType === "add") {
        response = await addScreen(values);
      } else {
        const updatedScreen = values;
        updatedScreen._id = stateData.selectedScreen._id;
        response = await updateScreen(updatedScreen);
      }
      if (response.success) {
        message.success(response.message);
        navigate('/partner');
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (e) {
      dispatch(HideLoading());
      message.error(e.message);
    }
  }

  const onFormValuesChanged = (values) => {
    if (values.leftToRightNumbering) {
      if (values.leftToRightNumbering === "Left To Right") {
        setLeftToRightNumbering("true");
      } else {
        setLeftToRightNumbering("false");
      }
    }
    if (values.topToBottomNumbering) {
      if (values.topToBottomNumbering === "Top To Bottom") {
        setTopToBottomNumbering("true");
      } else {
        setTopToBottomNumbering("false");
      }
    }
  };

  const addSection = () => {

  }

  return (
    <Form layout='vertical' initialValues={screen} onFinish={onFinish} onValuesChange={onFormValuesChanged}>
      <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
        <Col span={24}>
          <Form.Item
            label="Screen Name"
            name="name"
            rules={[{ required: true, message: "Screen name is required" }]}
          >
            <Input placeholder='Enter the Screen name' />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="Number of Rows"
            name="noOfRows"
            rules={[{ required: true, message: "Number of Rows is required!" }]}
          >
            <Input id="noOfRows" type="number" placeholder='Enter the no. of rows' />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="Number of Columns"
            name="noOfCols"
            rules={[{ required: true, message: "Number of Rows is required!" }]}
          >
            <Input id="noOfCols" type="number" placeholder='Enter the no. of Columns' />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Seat Rows direction" name="leftToRightNumbering">
            <Segmented options={['Left To Right', 'Right To Left']} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Seat Columns direction" name="topToBottomNumbering">
            <Segmented options={['Top To Bottom', 'Bottom To Top']} />
          </Form.Item>
        </Col>
      </Row>
      <SectionForm sections={sections} setSections={setSections} />
      <Form.Item>
        <Button
          block
          type='primary'
          htmlType='submit'
          style={{ fontSize: "1rem", fontWeight: "600" }}
        >Submit</Button>
      </Form.Item>
    </Form>
  )
}

export default ScreenForm