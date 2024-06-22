import React from "react";

type Props = {};

export function CardIcon({}: Props) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="20" fill="#175F70" />
      <path
        d="M28.1818 13H11.8182C10.814 13 10 13.7835 10 14.75V25.25C10 26.2165 10.814 27 11.8182 27H28.1818C29.186 27 30 26.2165 30 25.25V14.75C30 13.7835 29.186 13 28.1818 13Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 18H30"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
