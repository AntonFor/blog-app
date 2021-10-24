import React from 'react';

import { Form, Input, Button } from 'antd';

import Tags from '../tags';

import classes from './create-article.module.scss';

const CreateArticle = () => {
	const onFinish = (values) => {
		console.log('Success:', values);
	};
	
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	
	return (
		<Form
      name="article_create"
      className={classes["create-form"]}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
			onFinishFailed={onFinishFailed}
    >
			<h1 className={classes["create-form__heading"]}>Create new article</h1>
			<p className={classes["create-form__title"]}>Title</p>
      <Form.Item
        className={classes["create-form__input-title"]}
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

			<p className={classes["create-form__description"]}>Short description</p>
      <Form.Item
        className={classes["create-form__input-description"]}
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

      <p className={classes["create-form__text"]}>Text</p>
			<Form.Item
				className={classes["create-form__input-text"]}
        name="text"
        rules={[
          {
            required: true,
            message: 'Please input text article!',
          },
        ]}
      >
        <Input.TextArea placeholder="Text" />
      </Form.Item>

			<div><Tags /></div>

      <Form.Item className={classes["create-form__button-container"]}>
        <Button 
					className={classes["create-form__button"]}
					type="primary"
					htmlType="submit"
				>
					Send
        </Button>
      </Form.Item>
    </Form>
	);
}

export default CreateArticle;