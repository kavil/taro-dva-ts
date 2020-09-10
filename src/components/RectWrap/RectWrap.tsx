import React from 'react';
import './RectWrap.scss';
import { View } from '@tarojs/components';

type SelfProps = {
  title: string;
  mb?: number;
};
export const RectWrap: React.FC<SelfProps> = ({ title, children, mb }) => (
  <View className="rectWrap" style={{ marginBottom: mb }}>
    <View className="title">{title}</View>
    {children}
  </View>
);
