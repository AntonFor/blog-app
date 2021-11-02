import React from 'react';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { Form, Input, Button } from 'antd';

import Tags from '../tags';

import classes from './edit-article.module.scss';

const EditArticle = ({ history }) => {
	const onFinish = (values) => {
		console.log('Success:', values);
		history.push("/");
	};
	
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	
	return (
		<Form
      name="article_edit"
      className={classes["edit-form"]}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
			onFinishFailed={onFinishFailed}
    >
			<h1 className={classes["edit-form__heading"]}>Edit article</h1>
			<p className={classes["edit-form__title"]}>Title</p>
      <Form.Item
        className={classes["edit-form__input-title"]}
				name="title"
        rules={[
          {
            required: true,
						message: 'Please input title article!',
          },
        ]}
      >
        <Input placeholder="Title" />
      </Form.Item>

			<p className={classes["edit-form__description"]}>Short description</p>
      <Form.Item
        className={classes["edit-form__input-description"]}
				name="description"
        rules={[
          {
            required: true,
            message: 'Please input short description article!',
          },
        ]}
      >
        <Input
					placeholder="Short description"
				/>
      </Form.Item>

      <p className={classes["edit-form__text"]}>Text</p>
			<Form.Item
				className={classes["edit-form__input-text"]}
        name="text"
        rules={[
          {
            required: true,
            message: 'Please input text article!',
          },
        ]}
      >
        <Input.TextArea placeholder="Text" autoSize={{ minRows: 7, maxRows: 7 }} />
      </Form.Item>

			<div><Tags /></div>

      <Form.Item className={classes["edit-form__button-container"]}>
        <Button 
					className={classes["edit-form__button"]}
					type="primary"
					htmlType="submit"
				>
					Send
        </Button>
      </Form.Item>
    </Form>
	);
}

EditArticle.defaultProps = {
	history: {}
}

EditArticle.propTypes = {
	history: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
		PropTypes.func
  ])
}

export default withRouter(EditArticle);