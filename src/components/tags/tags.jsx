/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { Form, Input } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import classes from './tags.module.scss';

const Tags = () => {
	const [tag, setTag] = useState([{id: uuidv4(), text: ''}]);
	const [elements, setElements] = useState([]);

	const onClickAdd = () => {
		setTag(() => {
			const arr = [...tag, {id: uuidv4(), text: ''}]
			return arr;
		});
	}
	
	const onClickDelete = (event) => {
		const { target } = event;
		const { id } = target;
		setTag(() => {
			const arr = tag.filter((el) => el.id !== id);
			return arr;
		});
	}

	const onChangeLabel = (event) => {
		const { target } = event;
		const { id, value } = target;
		setTag(() => {
			const idx = tag.findIndex((el) => el.id === id);
			const oldItem = tag[idx];
			const newItem = { ...oldItem, text: value };
			const arr = [...tag.slice(0, idx), newItem, ...tag.slice(idx + 1)];
			return arr;
		});
	}

	useEffect(() => {
		setElements(() => {
			const arr = tag.map(item => (
				<TagElement key={item.id} item={item} onChangeLabel={onChangeLabel} onClickDelete={onClickDelete} />
			));
			return arr;
		});
	}, [tag]);

	return (
		<div className={classes.tags}>
			<p className={classes.tags__title}>Tags</p>
			<div className={classes.tags__container}>
				<ul className={classes.tags__list}>{elements}</ul>
				<button 
					className={classes["tags__button-add"]}
					type="button"
					onClick={onClickAdd}
				>
					Add tag
				</button>
			</div>
		</div>
	);
}

const TagElement = ({ item, onChangeLabel, onClickDelete }) => (
	<li id={item.id} className={classes.tag}>
		<Form.Item
			className={classes.tag__item}
			name={`tag-${item.id}`}
		>
			<Input id={item.id} placeholder="Tag" onChange={(event) => onChangeLabel(event)} />
		</Form.Item>

		<button
			id={item.id}
			className={classes["tag__button-delete"]}
			type="button"
			onClick={(event) => onClickDelete(event)}
		>
			Delete
		</button>
	</li>
)

TagElement.defaultProps = {
	item: {},
	onChangeLabel: () => {},
	onClickDelete: () => {}
}

TagElement.propTypes = {
	item: PropTypes.objectOf(PropTypes.string),
	onChangeLabel: PropTypes.func,
	onClickDelete: PropTypes.func
}

export default Tags;