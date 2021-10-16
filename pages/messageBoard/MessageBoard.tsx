import React, { createElement, useState } from 'react';
import { Comment, Tooltip, Avatar, Form, Button, List, Input } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import styles from '../../styles/messageBoard.module.css';
import moment from 'moment';

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }: any) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

export default function MessageBoard() {

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState('');
  const [comments, setComments] = useState([
    {
      author: "Han Solo",
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content: "We supply a series of design principles, practical patterns and high quality designresources (Sketch and Axure), to help people create their product prototypes beautifullyand efficiently.",
      time: moment(),
      likes: 0,
      dislikes: 0,
    },
    {
      author: "Han Solo",
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content: "We supply a series of design principles, practical patterns and high quality designresources (Sketch and Axure), to help people create their product prototypes beautifullyand efficiently.",
      time: moment(),
      likes: 0,
      dislikes: 0,
    }
  ]);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">&nbsp;{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">&nbsp;{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  const renderCommentsBox = () => {
    return (
      <List
        itemLayout="vertical"
        pagination={{ pageSize: 5 }}
        dataSource={comments}
        renderItem={item => (
          <List.Item>
            <Comment
              actions={actions}
              author={<a>{item.author}</a>}
              avatar={
                <Avatar src={item.avatar} alt="avatar" />
              }
              content={<p>{item.content}</p>}
              datetime={
                <Tooltip title={item.time.format('YYYY-MM-DD HH:mm:ss')}>
                  <span>{item.time.fromNow()}</span>
                </Tooltip>
              }
            />
          </List.Item>
        )}
      />
    )
  }

  const renderReplyBox = () => {

    const [submitting, setSubmitting] = useState(false)
    const [value, setValue] = useState('')

    const onSubmit = () => {
      if (!value) return;
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setValue('')
        setComments([
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: value,
            time: moment(),
            likes: 0,
            dislikes: 0
          },
          ...comments,
        ])
      }, 1000);
    };

    const onChange = (e: any) => {
      setValue(e.target.value);
    };

    return (
      <>
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="avatar"
            />
          }
          content={
            <>
              <Editor
                onChange={onChange}
                onSubmit={onSubmit}
                submitting={submitting}
                value={value}
              />
            </>
          }
        />
      </>
    );
  }

  return (
    <div className={styles.messageBoard}>
      {renderCommentsBox()}
      {renderReplyBox()}
    </div>
  );
};