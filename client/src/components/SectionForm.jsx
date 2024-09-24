import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Space } from "antd";
import React from "react";

function SectionForm({ sections, setSections }) {


  const addSection = () => {

    //TODO: implement add section
  };

  const sectionRowNoValidator = (sectionData) => {
    //TODO: Complete validator
    if (sectionData.index === 0) {

    }
    if (sectionData.rowNo > sections[sectionData.index - 1]) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
    return {
      validateStatus: 'error',
      errorMsg: 'The prime between 8 and 12 is 11!',
    };
  };

  return (
    <Space direction="vertical" >
      Sections
      {
        sections.map((section, index) => (
          <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
            <Space>
              <Form.Item
                name="sectionName"
                rules={[{ required: true, message: "Section name is required" }]}
              >
                <Input placeholder="Section Name" />
              </Form.Item>
              <Form.Item
                name="sectionRowNo"
                //TODO: fix validate
                validateStatus=""
                rules={[{ required: true, message: "Row number is required" }]}
              >
                <Input placeholder="Section Row Number" type="Number" />
              </Form.Item>
            </Space>
          </Row>
        ))
      }
      <Button onClick={addSection}> + Add Section</Button>
    </Space>
  );
};

export default SectionForm;