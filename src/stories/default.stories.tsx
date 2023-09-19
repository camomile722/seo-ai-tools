import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Component from "../pages/index";

export default {
    component: Component,
    title: "ProjectName/Components/Index",
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = () => <Component />;

export const Comp = Template.bind({});
