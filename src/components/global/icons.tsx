import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export type IconProps = {
  color?: string;
  size?: number;
};
export const HomeIcon: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M10 17.0697C9.58579 17.0697 9.25001 17.4054 9.25001 17.8197C9.25001 18.2339 9.58579 18.5697 10 18.5697H14C14.4142 18.5697 14.75 18.2339 14.75 17.8197C14.75 17.4054 14.4142 17.0697 14 17.0697H10Z"
      fill={color}
    />
    <Path
      d="M10 17.0697C9.58579 17.0697 9.25001 17.4054 9.25001 17.8197C9.25001 18.2339 9.58579 18.5697 10 18.5697H14C14.4142 18.5697 14.75 18.2339 14.75 17.8197C14.75 17.4054 14.4142 17.0697 14 17.0697H10Z"
      fill={color}
      fill-opacity="0.2"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.2108 1.25387C12.0703 1.24871 11.9297 1.24871 11.7892 1.25387C10.8618 1.28789 10.0268 1.60323 9.11115 2.12818C8.21888 2.63974 7.19165 3.38608 5.88826 4.33305L5.81741 4.38453C4.51402 5.33149 3.48676 6.07783 2.72451 6.76835C1.94232 7.47693 1.38435 8.17368 1.06542 9.04515C1.01711 9.17717 0.973653 9.31091 0.935143 9.44611C0.680923 10.3386 0.722785 11.2303 0.939096 12.2633C1.14989 13.27 1.54227 14.4776 2.04013 16.0098L2.0672 16.0931C2.56503 17.6253 2.95741 18.8329 3.37858 19.7712C3.81077 20.7341 4.301 21.4801 5.03127 22.0527C5.14189 22.1394 5.25566 22.2221 5.37234 22.3005C6.1426 22.8181 7.00355 23.0538 8.05284 23.1673C9.07539 23.2779 10.3451 23.2779 11.9562 23.2779H12.0438C13.6549 23.2779 14.9246 23.2779 15.9472 23.1673C16.9965 23.0538 17.8574 22.8181 18.6277 22.3005C18.7444 22.2221 18.8581 22.1394 18.9687 22.0527C19.699 21.4801 20.1892 20.7341 20.6214 19.7712C21.0426 18.8329 21.435 17.6253 21.9328 16.093L21.9599 16.0097C22.4577 14.4776 22.8501 13.2699 23.0609 12.2633C23.2772 11.2303 23.3191 10.3386 23.0649 9.44611C23.0264 9.31091 22.9829 9.17717 22.9346 9.04515C22.6157 8.17368 22.0577 7.47693 21.2755 6.76835C20.5132 6.07782 19.486 5.33149 18.1826 4.38452L18.1117 4.33303C16.8084 3.38607 15.7811 2.63973 14.8889 2.12818C13.9733 1.60323 13.1382 1.28789 12.2108 1.25387ZM11.8442 2.75286C11.948 2.74905 12.052 2.74905 12.1558 2.75286C12.7512 2.7747 13.3443 2.97167 14.1428 3.42948C14.9566 3.89603 15.9189 4.59396 17.2655 5.57232C18.6121 6.55068 19.5733 7.25026 20.2684 7.88002C20.9506 8.49798 21.3212 9.00112 21.526 9.56067C21.5617 9.65824 21.5938 9.75709 21.6222 9.85703C21.7855 10.4301 21.7814 11.055 21.5928 11.9558C21.4005 12.874 21.0341 14.0049 20.5198 15.5879C20.0054 17.1709 19.6371 18.3012 19.253 19.157C18.8761 19.9967 18.5121 20.5046 18.0432 20.8723C17.9614 20.9364 17.8773 20.9975 17.7911 21.0555C17.2965 21.3878 16.701 21.577 15.7859 21.676C14.8533 21.7768 13.6645 21.7779 12 21.7779C10.3355 21.7779 9.14673 21.7768 8.21414 21.676C7.29905 21.577 6.7035 21.3878 6.20894 21.0555C6.12269 20.9975 6.0386 20.9364 5.95684 20.8723C5.48796 20.5046 5.12396 19.9967 4.74705 19.157C4.36293 18.3012 3.9946 17.1709 3.48025 15.5879C2.9659 14.0049 2.59951 12.874 2.40725 11.9558C2.21861 11.055 2.21454 10.4301 2.37776 9.85703C2.40623 9.7571 2.43834 9.65824 2.47405 9.56067C2.67883 9.00112 3.04942 8.49798 3.73157 7.88002C4.42676 7.25026 5.38791 6.55068 6.73451 5.57232C8.0811 4.59396 9.04345 3.89603 9.85722 3.42948C10.6557 2.97167 11.2488 2.7747 11.8442 2.75286Z"
      fill={color}
      fill-opacity="0.2"
    />
  </Svg>
);

export const DiscoverIconUnfocused: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12.7499 7.99991C12.7499 7.5857 12.4141 7.24991 11.9999 7.24991C11.5857 7.24991 11.2499 7.5857 11.2499 7.99991V15.9999C11.2499 16.4141 11.5857 16.7499 11.9999 16.7499C12.4141 16.7499 12.7499 16.4141 12.7499 15.9999V7.99991Z"
      fill={color}
    />
    <Path
      d="M12.7499 7.99991C12.7499 7.5857 12.4141 7.24991 11.9999 7.24991C11.5857 7.24991 11.2499 7.5857 11.2499 7.99991V15.9999C11.2499 16.4141 11.5857 16.7499 11.9999 16.7499C12.4141 16.7499 12.7499 16.4141 12.7499 15.9999V7.99991Z"
      fill={color}
      fill-opacity="0.2"
    />
    <Path
      d="M9.74994 8.99991C9.74994 8.5857 9.41415 8.24991 8.99994 8.24991C8.58572 8.24991 8.24994 8.5857 8.24994 8.99991L8.24994 14.9999C8.24994 15.4141 8.58572 15.7499 8.99994 15.7499C9.41415 15.7499 9.74994 15.4141 9.74994 14.9999V8.99991Z"
      fill={color}
    />
    <Path
      d="M9.74994 8.99991C9.74994 8.5857 9.41415 8.24991 8.99994 8.24991C8.58572 8.24991 8.24994 8.5857 8.24994 8.99991L8.24994 14.9999C8.24994 15.4141 8.58572 15.7499 8.99994 15.7499C9.41415 15.7499 9.74994 15.4141 9.74994 14.9999V8.99991Z"
      fill={color}
      fill-opacity="0.2"
    />
    <Path
      d="M15.7499 8.99991C15.7499 8.5857 15.4141 8.24991 14.9999 8.24991C14.5857 8.24991 14.2499 8.5857 14.2499 8.99991V14.9999C14.2499 15.4141 14.5857 15.7499 14.9999 15.7499C15.4141 15.7499 15.7499 15.4141 15.7499 14.9999V8.99991Z"
      fill={color}
    />
    <Path
      d="M15.7499 8.99991C15.7499 8.5857 15.4141 8.24991 14.9999 8.24991C14.5857 8.24991 14.2499 8.5857 14.2499 8.99991V14.9999C14.2499 15.4141 14.5857 15.7499 14.9999 15.7499C15.4141 15.7499 15.7499 15.4141 15.7499 14.9999V8.99991Z"
      fill={color}
      fill-opacity="0.2"
    />
    <Path
      d="M6.74994 10.9999C6.74994 10.5857 6.41415 10.2499 5.99994 10.2499C5.58572 10.2499 5.24994 10.5857 5.24994 10.9999L5.24994 12.9999C5.24994 13.4141 5.58572 13.7499 5.99994 13.7499C6.41415 13.7499 6.74994 13.4141 6.74994 12.9999L6.74994 10.9999Z"
      fill={color}
    />
    <Path
      d="M6.74994 10.9999C6.74994 10.5857 6.41415 10.2499 5.99994 10.2499C5.58572 10.2499 5.24994 10.5857 5.24994 10.9999L5.24994 12.9999C5.24994 13.4141 5.58572 13.7499 5.99994 13.7499C6.41415 13.7499 6.74994 13.4141 6.74994 12.9999L6.74994 10.9999Z"
      fill={color}
      fill-opacity="0.2"
    />
    <Path
      d="M18.7499 10.9999C18.7499 10.5857 18.4141 10.2499 17.9999 10.2499C17.5857 10.2499 17.2499 10.5857 17.2499 10.9999V12.9999C17.2499 13.4141 17.5857 13.7499 17.9999 13.7499C18.4141 13.7499 18.7499 13.4141 18.7499 12.9999V10.9999Z"
      fill={color}
    />
    <Path
      d="M18.7499 10.9999C18.7499 10.5857 18.4141 10.2499 17.9999 10.2499C17.5857 10.2499 17.2499 10.5857 17.2499 10.9999V12.9999C17.2499 13.4141 17.5857 13.7499 17.9999 13.7499C18.4141 13.7499 18.7499 13.4141 18.7499 12.9999V10.9999Z"
      fill={color}
      fill-opacity="0.2"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.0667 1.79551C14.2621 1.72362 13.279 1.72363 12.0352 1.72363H11.9647C10.7209 1.72363 9.73775 1.72362 8.93318 1.79551C8.10672 1.86936 7.41547 2.0224 6.76215 2.35755C6.59292 2.44437 6.4281 2.53952 6.2683 2.64268C5.65139 3.04089 5.17323 3.56301 4.69604 4.24182C4.2315 4.90266 3.73993 5.7541 3.11803 6.83127L3.08281 6.89227C2.4609 7.96944 1.96931 8.82087 1.62929 9.5536C1.28001 10.3063 1.06692 10.9814 1.03051 11.7148C1.02108 11.9048 1.02108 12.0951 1.03051 12.285C1.06692 13.0184 1.28001 13.6936 1.62929 14.4462C1.96931 15.1789 2.46089 16.0304 3.08279 17.1075L3.11801 17.1685C3.73991 18.2457 4.2315 19.0972 4.69604 19.758C5.17323 20.4368 5.65139 20.9589 6.26829 21.3571C6.42809 21.4603 6.59292 21.5555 6.76215 21.6423C7.41546 21.9774 8.10672 22.1305 8.93318 22.2043C9.73774 22.2762 10.7209 22.2762 11.9647 22.2762H12.0351C13.2789 22.2762 14.2621 22.2762 15.0667 22.2043C15.8931 22.1305 16.5844 21.9774 17.2377 21.6423C17.4069 21.5555 17.5718 21.4603 17.7316 21.3571C18.3485 20.9589 18.8266 20.4368 19.3038 19.758C19.7684 19.0972 20.2599 18.2458 20.8818 17.1686L20.9171 17.1076C21.539 16.0304 22.0306 15.179 22.3706 14.4462C22.7199 13.6936 22.9329 13.0184 22.9694 12.285C22.9788 12.0951 22.9788 11.9048 22.9694 11.7148C22.9329 10.9814 22.7199 10.3063 22.3706 9.5536C22.0306 8.82087 21.539 7.96943 20.917 6.89225L20.8818 6.83121C20.2599 5.75406 19.7684 4.90265 19.3038 4.24182C18.8266 3.56301 18.3485 3.04089 17.7316 2.64268C17.5718 2.53953 17.407 2.44437 17.2377 2.35755C16.5844 2.0224 15.8932 1.86936 15.0667 1.79551ZM7.44681 3.69218C7.86803 3.4761 8.35086 3.35352 9.06668 3.28956C9.7968 3.22432 10.7131 3.22363 11.9999 3.22363C13.2867 3.22363 14.2031 3.22432 14.9332 3.28956C15.649 3.35352 16.1318 3.4761 16.5531 3.69218C16.6781 3.75635 16.8 3.82668 16.9181 3.90293C17.3158 4.15967 17.6634 4.51653 18.0767 5.10446C18.4983 5.70414 18.957 6.49738 19.6004 7.61177C20.2438 8.72616 20.7014 9.52009 21.01 10.185C21.3125 10.8369 21.4477 11.3163 21.4712 11.7892C21.4782 11.9296 21.4782 12.0702 21.4712 12.2107C21.4477 12.6835 21.3125 13.1629 21.01 13.8148C20.7014 14.4797 20.2438 15.2737 19.6004 16.3881C18.957 17.5024 18.4983 18.2957 18.0767 18.8954C17.6634 19.4833 17.3158 19.8402 16.9181 20.0969C16.8 20.1731 16.6781 20.2435 16.5531 20.3076C16.1318 20.5237 15.649 20.6463 14.9332 20.7103C14.2031 20.7755 13.2867 20.7762 11.9999 20.7762C10.7131 20.7762 9.7968 20.7755 9.06668 20.7103C8.35086 20.6463 7.86803 20.5237 7.44681 20.3076C7.32173 20.2435 7.1999 20.1731 7.08179 20.0969C6.68405 19.8402 6.33648 19.4833 5.92318 18.8954C5.50162 18.2957 5.04285 17.5024 4.39945 16.3881C3.75606 15.2737 3.29848 14.4797 2.98992 13.8148C2.6874 13.1629 2.55214 12.6835 2.52867 12.2107C2.52169 12.0702 2.52169 11.9296 2.52867 11.7892C2.55214 11.3163 2.6874 10.8369 2.98992 10.185C3.29848 9.52009 3.75606 8.72616 4.39945 7.61177C5.04285 6.49738 5.50162 5.70414 5.92318 5.10446C6.33648 4.51653 6.68405 4.15967 7.08179 3.90293C7.1999 3.82668 7.32173 3.75635 7.44681 3.69218Z"
      fill={color}
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.0667 1.79551C14.2621 1.72362 13.279 1.72363 12.0352 1.72363H11.9647C10.7209 1.72363 9.73775 1.72362 8.93318 1.79551C8.10672 1.86936 7.41547 2.0224 6.76215 2.35755C6.59292 2.44437 6.4281 2.53952 6.2683 2.64268C5.65139 3.04089 5.17323 3.56301 4.69604 4.24182C4.2315 4.90266 3.73993 5.7541 3.11803 6.83127L3.08281 6.89227C2.4609 7.96944 1.96931 8.82087 1.62929 9.5536C1.28001 10.3063 1.06692 10.9814 1.03051 11.7148C1.02108 11.9048 1.02108 12.0951 1.03051 12.285C1.06692 13.0184 1.28001 13.6936 1.62929 14.4462C1.96931 15.1789 2.46089 16.0304 3.08279 17.1075L3.11801 17.1685C3.73991 18.2457 4.2315 19.0972 4.69604 19.758C5.17323 20.4368 5.65139 20.9589 6.26829 21.3571C6.42809 21.4603 6.59292 21.5555 6.76215 21.6423C7.41546 21.9774 8.10672 22.1305 8.93318 22.2043C9.73774 22.2762 10.7209 22.2762 11.9647 22.2762H12.0351C13.2789 22.2762 14.2621 22.2762 15.0667 22.2043C15.8931 22.1305 16.5844 21.9774 17.2377 21.6423C17.4069 21.5555 17.5718 21.4603 17.7316 21.3571C18.3485 20.9589 18.8266 20.4368 19.3038 19.758C19.7684 19.0972 20.2599 18.2458 20.8818 17.1686L20.9171 17.1076C21.539 16.0304 22.0306 15.179 22.3706 14.4462C22.7199 13.6936 22.9329 13.0184 22.9694 12.285C22.9788 12.0951 22.9788 11.9048 22.9694 11.7148C22.9329 10.9814 22.7199 10.3063 22.3706 9.5536C22.0306 8.82087 21.539 7.96943 20.917 6.89225L20.8818 6.83121C20.2599 5.75406 19.7684 4.90265 19.3038 4.24182C18.8266 3.56301 18.3485 3.04089 17.7316 2.64268C17.5718 2.53953 17.407 2.44437 17.2377 2.35755C16.5844 2.0224 15.8932 1.86936 15.0667 1.79551ZM7.44681 3.69218C7.86803 3.4761 8.35086 3.35352 9.06668 3.28956C9.7968 3.22432 10.7131 3.22363 11.9999 3.22363C13.2867 3.22363 14.2031 3.22432 14.9332 3.28956C15.649 3.35352 16.1318 3.4761 16.5531 3.69218C16.6781 3.75635 16.8 3.82668 16.9181 3.90293C17.3158 4.15967 17.6634 4.51653 18.0767 5.10446C18.4983 5.70414 18.957 6.49738 19.6004 7.61177C20.2438 8.72616 20.7014 9.52009 21.01 10.185C21.3125 10.8369 21.4477 11.3163 21.4712 11.7892C21.4782 11.9296 21.4782 12.0702 21.4712 12.2107C21.4477 12.6835 21.3125 13.1629 21.01 13.8148C20.7014 14.4797 20.2438 15.2737 19.6004 16.3881C18.957 17.5024 18.4983 18.2957 18.0767 18.8954C17.6634 19.4833 17.3158 19.8402 16.9181 20.0969C16.8 20.1731 16.6781 20.2435 16.5531 20.3076C16.1318 20.5237 15.649 20.6463 14.9332 20.7103C14.2031 20.7755 13.2867 20.7762 11.9999 20.7762C10.7131 20.7762 9.7968 20.7755 9.06668 20.7103C8.35086 20.6463 7.86803 20.5237 7.44681 20.3076C7.32173 20.2435 7.1999 20.1731 7.08179 20.0969C6.68405 19.8402 6.33648 19.4833 5.92318 18.8954C5.50162 18.2957 5.04285 17.5024 4.39945 16.3881C3.75606 15.2737 3.29848 14.4797 2.98992 13.8148C2.6874 13.1629 2.55214 12.6835 2.52867 12.2107C2.52169 12.0702 2.52169 11.9296 2.52867 11.7892C2.55214 11.3163 2.6874 10.8369 2.98992 10.185C3.29848 9.52009 3.75606 8.72616 4.39945 7.61177C5.04285 6.49738 5.50162 5.70414 5.92318 5.10446C6.33648 4.51653 6.68405 4.15967 7.08179 3.90293C7.1999 3.82668 7.32173 3.75635 7.44681 3.69218Z"
      fill={color}
      fill-opacity="0.2"
    />
  </Svg>
);
export const DiscoverIconFocused: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.9647 1.72363H12.0352C13.279 1.72363 14.2621 1.72362 15.0667 1.79551C15.8932 1.86936 16.5844 2.0224 17.2377 2.35755C17.407 2.44437 17.5718 2.53953 17.7316 2.64268C18.3485 3.04089 18.8266 3.56301 19.3038 4.24182C19.7684 4.90265 20.2599 5.75406 20.8818 6.83121L20.917 6.89225C21.539 7.96943 22.0306 8.82087 22.3706 9.5536C22.7199 10.3063 22.9329 10.9814 22.9694 11.7148C22.9788 11.9048 22.9788 12.0951 22.9694 12.285C22.9329 13.0184 22.7199 13.6936 22.3706 14.4462C22.0306 15.179 21.539 16.0304 20.9171 17.1076L20.8818 17.1686C20.26 18.2457 19.7684 19.0972 19.3038 19.758C18.8266 20.4368 18.3485 20.9589 17.7316 21.3571C17.5718 21.4603 17.4069 21.5555 17.2377 21.6423C16.5844 21.9774 15.8931 22.1305 15.0667 22.2043C14.2621 22.2762 13.279 22.2762 12.0352 22.2762H11.9647C10.7209 22.2762 9.73774 22.2762 8.93318 22.2043C8.10672 22.1305 7.41546 21.9774 6.76215 21.6423C6.59292 21.5555 6.42809 21.4603 6.26829 21.3571C5.65139 20.9589 5.17323 20.4368 4.69604 19.758C4.2315 19.0972 3.73992 18.2457 3.11802 17.1685L3.0828 17.1075C2.46091 16.0304 1.96931 15.1789 1.62929 14.4462C1.28001 13.6936 1.06692 13.0184 1.03051 12.285C1.02108 12.0951 1.02108 11.9048 1.03051 11.7148C1.06692 10.9814 1.28001 10.3063 1.62929 9.5536C1.96931 8.82087 2.4609 7.96944 3.08281 6.89227L3.11803 6.83127C3.73993 5.7541 4.2315 4.90266 4.69604 4.24182C5.17323 3.56301 5.65139 3.04089 6.2683 2.64268C6.4281 2.53952 6.59292 2.44437 6.76215 2.35755C7.41547 2.0224 8.10672 1.86936 8.93318 1.79551C9.73775 1.72362 10.7209 1.72363 11.9647 1.72363ZM12.7499 7.99994C12.7499 7.58573 12.4142 7.24994 11.9999 7.24994C11.5857 7.24994 11.2499 7.58573 11.2499 7.99994V15.9999C11.2499 16.4142 11.5857 16.7499 11.9999 16.7499C12.4142 16.7499 12.7499 16.4142 12.7499 15.9999V7.99994ZM9.74994 8.99994C9.74994 8.58573 9.41415 8.24994 8.99994 8.24994C8.58573 8.24994 8.24994 8.58573 8.24994 8.99994L8.24994 14.9999C8.24994 15.4142 8.58573 15.7499 8.99994 15.7499C9.41415 15.7499 9.74994 15.4142 9.74994 14.9999V8.99994ZM15.7499 8.99994C15.7499 8.58573 15.4142 8.24994 14.9999 8.24994C14.5857 8.24994 14.2499 8.58573 14.2499 8.99994V14.9999C14.2499 15.4142 14.5857 15.7499 14.9999 15.7499C15.4142 15.7499 15.7499 15.4142 15.7499 14.9999V8.99994ZM6.74994 10.9999C6.74994 10.5857 6.41415 10.2499 5.99994 10.2499C5.58573 10.2499 5.24994 10.5857 5.24994 10.9999L5.24994 12.9999C5.24994 13.4142 5.58573 13.7499 5.99994 13.7499C6.41415 13.7499 6.74994 13.4142 6.74994 12.9999L6.74994 10.9999ZM18.7499 10.9999C18.7499 10.5857 18.4142 10.2499 17.9999 10.2499C17.5857 10.2499 17.2499 10.5857 17.2499 10.9999V12.9999C17.2499 13.4142 17.5857 13.7499 17.9999 13.7499C18.4142 13.7499 18.7499 13.4142 18.7499 12.9999V10.9999Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.9647 1.72363H12.0352C13.279 1.72363 14.2621 1.72362 15.0667 1.79551C15.8932 1.86936 16.5844 2.0224 17.2377 2.35755C17.407 2.44437 17.5718 2.53953 17.7316 2.64268C18.3485 3.04089 18.8266 3.56301 19.3038 4.24182C19.7684 4.90265 20.2599 5.75406 20.8818 6.83121L20.917 6.89225C21.539 7.96943 22.0306 8.82087 22.3706 9.5536C22.7199 10.3063 22.9329 10.9814 22.9694 11.7148C22.9788 11.9048 22.9788 12.0951 22.9694 12.285C22.9329 13.0184 22.7199 13.6936 22.3706 14.4462C22.0306 15.179 21.539 16.0304 20.9171 17.1076L20.8818 17.1686C20.26 18.2457 19.7684 19.0972 19.3038 19.758C18.8266 20.4368 18.3485 20.9589 17.7316 21.3571C17.5718 21.4603 17.4069 21.5555 17.2377 21.6423C16.5844 21.9774 15.8931 22.1305 15.0667 22.2043C14.2621 22.2762 13.279 22.2762 12.0352 22.2762H11.9647C10.7209 22.2762 9.73774 22.2762 8.93318 22.2043C8.10672 22.1305 7.41546 21.9774 6.76215 21.6423C6.59292 21.5555 6.42809 21.4603 6.26829 21.3571C5.65139 20.9589 5.17323 20.4368 4.69604 19.758C4.2315 19.0972 3.73992 18.2457 3.11802 17.1685L3.0828 17.1075C2.46091 16.0304 1.96931 15.1789 1.62929 14.4462C1.28001 13.6936 1.06692 13.0184 1.03051 12.285C1.02108 12.0951 1.02108 11.9048 1.03051 11.7148C1.06692 10.9814 1.28001 10.3063 1.62929 9.5536C1.96931 8.82087 2.4609 7.96944 3.08281 6.89227L3.11803 6.83127C3.73993 5.7541 4.2315 4.90266 4.69604 4.24182C5.17323 3.56301 5.65139 3.04089 6.2683 2.64268C6.4281 2.53952 6.59292 2.44437 6.76215 2.35755C7.41547 2.0224 8.10672 1.86936 8.93318 1.79551C9.73775 1.72362 10.7209 1.72363 11.9647 1.72363ZM12.7499 7.99994C12.7499 7.58573 12.4142 7.24994 11.9999 7.24994C11.5857 7.24994 11.2499 7.58573 11.2499 7.99994V15.9999C11.2499 16.4142 11.5857 16.7499 11.9999 16.7499C12.4142 16.7499 12.7499 16.4142 12.7499 15.9999V7.99994ZM9.74994 8.99994C9.74994 8.58573 9.41415 8.24994 8.99994 8.24994C8.58573 8.24994 8.24994 8.58573 8.24994 8.99994L8.24994 14.9999C8.24994 15.4142 8.58573 15.7499 8.99994 15.7499C9.41415 15.7499 9.74994 15.4142 9.74994 14.9999V8.99994ZM15.7499 8.99994C15.7499 8.58573 15.4142 8.24994 14.9999 8.24994C14.5857 8.24994 14.2499 8.58573 14.2499 8.99994V14.9999C14.2499 15.4142 14.5857 15.7499 14.9999 15.7499C15.4142 15.7499 15.7499 15.4142 15.7499 14.9999V8.99994ZM6.74994 10.9999C6.74994 10.5857 6.41415 10.2499 5.99994 10.2499C5.58573 10.2499 5.24994 10.5857 5.24994 10.9999L5.24994 12.9999C5.24994 13.4142 5.58573 13.7499 5.99994 13.7499C6.41415 13.7499 6.74994 13.4142 6.74994 12.9999L6.74994 10.9999ZM18.7499 10.9999C18.7499 10.5857 18.4142 10.2499 17.9999 10.2499C17.5857 10.2499 17.2499 10.5857 17.2499 10.9999V12.9999C17.2499 13.4142 17.5857 13.7499 17.9999 13.7499C18.4142 13.7499 18.7499 13.4142 18.7499 12.9999V10.9999Z"
      fill={color}
      fillOpacity="0.2"
    />
  </Svg>
);

export const ProfileIconFocused: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C9.37665 2 7.25 4.12665 7.25 6.75C7.25 9.37335 9.37665 11.5 12 11.5C14.6234 11.5 16.75 9.37335 16.75 6.75C16.75 4.12665 14.6234 2 12 2Z"
      fill={color}
    />
    <Path
      d="M12 2C9.37665 2 7.25 4.12665 7.25 6.75C7.25 9.37335 9.37665 11.5 12 11.5C14.6234 11.5 16.75 9.37335 16.75 6.75C16.75 4.12665 14.6234 2 12 2Z"
      fill={color}
      fill-opacity="0.2"
    />
    <Path
      d="M9 13C6.37665 13 4.25 15.1266 4.25 17.75C4.25 20.3734 6.37665 22.5 9 22.5H15C17.6234 22.5 19.75 20.3734 19.75 17.75C19.75 15.1266 17.6234 13 15 13H9Z"
      fill={color}
    />
    <Path
      d="M9 13C6.37665 13 4.25 15.1266 4.25 17.75C4.25 20.3734 6.37665 22.5 9 22.5H15C17.6234 22.5 19.75 20.3734 19.75 17.75C19.75 15.1266 17.6234 13 15 13H9Z"
      fill={color}
      fill-opacity="0.2"
    />
  </Svg>
);

export const ProfileIconUnfocused: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 1.25C9.37665 1.25 7.25 3.37665 7.25 6C7.25 8.62335 9.37665 10.75 12 10.75C14.6234 10.75 16.75 8.62335 16.75 6C16.75 3.37665 14.6234 1.25 12 1.25ZM8.75 6C8.75 4.20507 10.2051 2.75 12 2.75C13.7949 2.75 15.25 4.20507 15.25 6C15.25 7.79493 13.7949 9.25 12 9.25C10.2051 9.25 8.75 7.79493 8.75 6Z"
      fill={color}
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 1.25C9.37665 1.25 7.25 3.37665 7.25 6C7.25 8.62335 9.37665 10.75 12 10.75C14.6234 10.75 16.75 8.62335 16.75 6C16.75 3.37665 14.6234 1.25 12 1.25ZM8.75 6C8.75 4.20507 10.2051 2.75 12 2.75C13.7949 2.75 15.25 4.20507 15.25 6C15.25 7.79493 13.7949 9.25 12 9.25C10.2051 9.25 8.75 7.79493 8.75 6Z"
      fill={color}
      fill-opacity="0.2"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9 12.25C6.37665 12.25 4.25 14.3766 4.25 17C4.25 19.6234 6.37665 21.75 9 21.75H15C17.6234 21.75 19.75 19.6234 19.75 17C19.75 14.3766 17.6234 12.25 15 12.25H9ZM5.75 17C5.75 15.2051 7.20507 13.75 9 13.75H15C16.7949 13.75 18.25 15.2051 18.25 17C18.25 18.7949 16.7949 20.25 15 20.25H9C7.20507 20.25 5.75 18.7949 5.75 17Z"
      fill={color}
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9 12.25C6.37665 12.25 4.25 14.3766 4.25 17C4.25 19.6234 6.37665 21.75 9 21.75H15C17.6234 21.75 19.75 19.6234 19.75 17C19.75 14.3766 17.6234 12.25 15 12.25H9ZM5.75 17C5.75 15.2051 7.20507 13.75 9 13.75H15C16.7949 13.75 18.25 15.2051 18.25 17C18.25 18.7949 16.7949 20.25 15 20.25H9C7.20507 20.25 5.75 18.7949 5.75 17Z"
      fill={color}
      fill-opacity="0.2"
    />
  </Svg>
);

export const LikeIconUnfocused: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M20.8468 3.93557C19.5193 2.58173 18.0414 2.16291 16.6535 2.26451C15.3031 2.36337 14.087 2.94914 13.1988 3.51257C12.4984 3.95689 11.5014 3.95689 10.8009 3.51257C9.9127 2.94915 8.6966 2.36338 7.34624 2.26453C5.95834 2.16293 4.48046 2.58175 3.1529 3.93557C1.58562 5.53386 1.0939 7.50689 1.29136 9.50265C1.48653 11.4754 2.35186 13.4808 3.50598 15.2578C4.66317 17.0396 6.14136 18.6392 7.62433 19.8008C9.07467 20.9368 10.6527 21.75 11.9999 21.75C13.3471 21.75 14.9251 20.9368 16.3754 19.8008C17.8584 18.6392 19.3366 17.0396 20.4938 15.2578C21.6479 13.4808 22.5132 11.4754 22.7084 9.50265C22.9058 7.50688 22.4141 5.53386 20.8468 3.93557ZM14.0023 4.77922C14.7877 4.28097 15.7599 3.83394 16.763 3.76051C17.7285 3.68983 18.7692 3.95923 19.7758 4.98579C20.9791 6.21282 21.3774 7.71987 21.2157 9.35497C21.0516 11.0131 20.3084 12.7893 19.2358 14.4408C18.1663 16.0876 16.7996 17.5632 15.4505 18.6199C14.0688 19.7021 12.8278 20.25 11.9999 20.25C11.172 20.25 9.93093 19.7021 8.54926 18.6199C7.20021 17.5632 5.83348 16.0876 4.76394 14.4408C3.69132 12.7893 2.94812 11.0131 2.78407 9.35497C2.6223 7.71987 3.02067 6.21283 4.2239 4.98579C5.23053 3.95925 6.27119 3.68984 7.23672 3.76052C8.23978 3.83395 9.21197 4.28098 9.99742 4.77922C11.1883 5.53467 12.8114 5.53467 14.0023 4.77922Z"
      fill={color}
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M20.8468 3.93557C19.5193 2.58173 18.0414 2.16291 16.6535 2.26451C15.3031 2.36337 14.087 2.94914 13.1988 3.51257C12.4984 3.95689 11.5014 3.95689 10.8009 3.51257C9.9127 2.94915 8.6966 2.36338 7.34624 2.26453C5.95834 2.16293 4.48046 2.58175 3.1529 3.93557C1.58562 5.53386 1.0939 7.50689 1.29136 9.50265C1.48653 11.4754 2.35186 13.4808 3.50598 15.2578C4.66317 17.0396 6.14136 18.6392 7.62433 19.8008C9.07467 20.9368 10.6527 21.75 11.9999 21.75C13.3471 21.75 14.9251 20.9368 16.3754 19.8008C17.8584 18.6392 19.3366 17.0396 20.4938 15.2578C21.6479 13.4808 22.5132 11.4754 22.7084 9.50265C22.9058 7.50688 22.4141 5.53386 20.8468 3.93557ZM14.0023 4.77922C14.7877 4.28097 15.7599 3.83394 16.763 3.76051C17.7285 3.68983 18.7692 3.95923 19.7758 4.98579C20.9791 6.21282 21.3774 7.71987 21.2157 9.35497C21.0516 11.0131 20.3084 12.7893 19.2358 14.4408C18.1663 16.0876 16.7996 17.5632 15.4505 18.6199C14.0688 19.7021 12.8278 20.25 11.9999 20.25C11.172 20.25 9.93093 19.7021 8.54926 18.6199C7.20021 17.5632 5.83348 16.0876 4.76394 14.4408C3.69132 12.7893 2.94812 11.0131 2.78407 9.35497C2.6223 7.71987 3.02067 6.21283 4.2239 4.98579C5.23053 3.95925 6.27119 3.68984 7.23672 3.76052C8.23978 3.83395 9.21197 4.28098 9.99742 4.77922C11.1883 5.53467 12.8114 5.53467 14.0023 4.77922Z"
      fill={color}
      fill-opacity="0.2"
    />
  </Svg>
);

export const LikeIconFocused: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.3115 4.46071C17.9773 2.08032 15.2743 3.08425 13.6007 4.14593C12.655 4.74582 11.345 4.74582 10.3993 4.14593C8.72564 3.08427 6.02272 2.08035 3.68853 4.46072C-1.85249 10.1114 7.64988 21 12 21C16.3502 21 25.8525 10.1114 20.3115 4.46071Z"
      fill={color}
    />
    <Path
      d="M20.3115 4.46071C17.9773 2.08032 15.2743 3.08425 13.6007 4.14593C12.655 4.74582 11.345 4.74582 10.3993 4.14593C8.72564 3.08427 6.02272 2.08035 3.68853 4.46072C-1.85249 10.1114 7.64988 21 12 21C16.3502 21 25.8525 10.1114 20.3115 4.46071Z"
      fill={color}
      fill-opacity="0.2"
    />
  </Svg>
);
export const HomeFocused: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.29367 4.96556C3.62685 6.90311 2.29344 7.87189 1.76974 9.30291C1.72773 9.41771 1.68994 9.534 1.65645 9.65157C1.23901 11.1171 1.74832 12.6846 2.76696 15.8197C3.78559 18.9547 4.2949 20.5222 5.49405 21.4625C5.59025 21.5379 5.68918 21.6098 5.79064 21.678C7.05546 22.5279 8.70364 22.5279 12 22.5279C15.2964 22.5279 16.9446 22.5279 18.2094 21.678C18.3108 21.6098 18.4098 21.5379 18.506 21.4625C19.7051 20.5222 20.2144 18.9547 21.2331 15.8197C22.2517 12.6846 22.761 11.1171 22.3436 9.65157C22.3101 9.534 22.2723 9.41771 22.2303 9.30291C21.7066 7.87189 20.3732 6.90312 17.7064 4.96557C15.0395 3.02801 13.7061 2.05923 12.1833 2.00336C12.0611 1.99888 11.9389 1.99888 11.8167 2.00336C10.2939 2.05923 8.96048 3.02801 6.29367 4.96556ZM10 17.0697C9.58579 17.0697 9.25 17.4054 9.25 17.8197C9.25 18.2339 9.58579 18.5697 10 18.5697H14C14.4142 18.5697 14.75 18.2339 14.75 17.8197C14.75 17.4054 14.4142 17.0697 14 17.0697H10Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.29367 4.96556C3.62685 6.90311 2.29344 7.87189 1.76974 9.30291C1.72773 9.41771 1.68994 9.534 1.65645 9.65157C1.23901 11.1171 1.74832 12.6846 2.76696 15.8197C3.78559 18.9547 4.2949 20.5222 5.49405 21.4625C5.59025 21.5379 5.68918 21.6098 5.79064 21.678C7.05546 22.5279 8.70364 22.5279 12 22.5279C15.2964 22.5279 16.9446 22.5279 18.2094 21.678C18.3108 21.6098 18.4098 21.5379 18.506 21.4625C19.7051 20.5222 20.2144 18.9547 21.2331 15.8197C22.2517 12.6846 22.761 11.1171 22.3436 9.65157C22.3101 9.534 22.2723 9.41771 22.2303 9.30291C21.7066 7.87189 20.3732 6.90312 17.7064 4.96557C15.0395 3.02801 13.7061 2.05923 12.1833 2.00336C12.0611 1.99888 11.9389 1.99888 11.8167 2.00336C10.2939 2.05923 8.96048 3.02801 6.29367 4.96556ZM10 17.0697C9.58579 17.0697 9.25 17.4054 9.25 17.8197C9.25 18.2339 9.58579 18.5697 10 18.5697H14C14.4142 18.5697 14.75 18.2339 14.75 17.8197C14.75 17.4054 14.4142 17.0697 14 17.0697H10Z"
      fill={color}
      fillOpacity="0.2"
    />
  </Svg>
);
export const ExploreIcon: React.FC<IconProps> = ({ size, color }) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 28 28">
    <Path
      stroke={color}
      strokeWidth={1.5}
      d="M23.625 8.443c1.486 2.574 2.229 3.86 2.299 5.268.01.192.01.386 0 .578-.07 1.408-.813 2.694-2.299 5.268s-2.229 3.86-3.413 4.625c-.162.104-.329.2-.5.289-1.254.643-2.74.643-5.712.643-2.972 0-4.458 0-5.711-.643a5.828 5.828 0 0 1-.501-.29c-1.184-.764-1.927-2.05-3.413-4.624-1.486-2.574-2.229-3.86-2.299-5.268a5.832 5.832 0 0 1 0-.578c.07-1.408.813-2.694 2.299-5.268s2.229-3.86 3.413-4.625c.162-.104.329-.2.5-.289 1.254-.643 2.74-.643 5.712-.643 2.972 0 4.458 0 5.711.643.172.088.34.185.501.29 1.184.763 1.927 2.05 3.413 4.624Z"
    />
    <Path
      stroke={color}
      strokeWidth={1.5}
      d="M11.685 12.954a2.333 2.333 0 0 1 1.27-1.269l3.123-1.286c.959-.394 1.917.565 1.523 1.523l-1.286 3.123a2.333 2.333 0 0 1-1.27 1.27L11.922 17.6c-.959.394-1.917-.564-1.523-1.523l1.286-3.123Z"
    />
  </Svg>
);

export const AddIcon: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      opacity=".4"
      d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81v8.37C2 19.83 4.17 22 7.81 22h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2Z"
      fill={color}
    />
    <Path
      d="M16 11.25h-3.25V8c0-.41-.34-.75-.75-.75s-.75.34-.75.75v3.25H8c-.41 0-.75.34-.75.75s.34.75.75.75h3.25V16c0 .41.34.75.75.75s.75-.34.75-.75v-3.25H16c.41 0 .75-.34.75-.75s-.34-.75-.75-.75Z"
      fill={color}
    />
  </Svg>
);

export const TrashIcon: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82.04.41.4.71.82.67l2.04-.2c5.24-.52 10.52-.32 15.82.21h.08c.38 0 .71-.29.75-.68a.766.766 0 0 0-.69-.82Z"
      fill={color}
    />
    <Path
      opacity=".399"
      d="M19.23 8.14c-.24-.25-.57-.39-.91-.39H5.68c-.34 0-.68.14-.91.39-.23.25-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.58 17a.75.75 0 0 1 .75-.75h3.33a.75.75 0 0 1 0 1.5h-3.33a.75.75 0 0 1-.75-.75ZM8.75 13a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z"
      fill={color}
    />
  </Svg>
);

export const SunIcon: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM12 22.96c-.55 0-1-.41-1-.96v-.08c0-.55.45-1 1-1s1 .45 1 1-.45 1.04-1 1.04Zm7.14-2.82c-.26 0-.51-.1-.71-.29l-.13-.13a.996.996 0 1 1 1.41-1.41l.13.13a.996.996 0 0 1-.7 1.7Zm-14.28 0c-.26 0-.51-.1-.71-.29a.996.996 0 0 1 0-1.41l.13-.13a.996.996 0 1 1 1.41 1.41l-.13.13c-.19.19-.45.29-.7.29ZM22 13h-.08c-.55 0-1-.45-1-1s.45-1 1-1 1.04.45 1.04 1-.41 1-.96 1ZM2.08 13H2c-.55 0-1-.45-1-1s.45-1 1-1 1.04.45 1.04 1-.41 1-.96 1Zm16.93-7.01c-.26 0-.51-.1-.71-.29a.996.996 0 0 1 0-1.41l.13-.13a.996.996 0 1 1 1.41 1.41l-.13.13c-.19.19-.44.29-.7.29Zm-14.02 0c-.26 0-.51-.1-.71-.29l-.13-.14a.996.996 0 1 1 1.41-1.41l.13.13c.39.39.39 1.02 0 1.41-.19.2-.45.3-.7.3ZM12 3.04c-.55 0-1-.41-1-.96V2c0-.55.45-1 1-1s1 .45 1 1-.45 1.04-1 1.04Z"
      fill={color}
    />
  </Svg>
);

export const MoonIcon: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21.529 15.93c-.16-.27-.61-.69-1.73-.49-.62.11-1.25.16-1.88.13a8.41 8.41 0 0 1-5.91-2.82c-1.3-1.45-2.1-3.34-2.11-5.38 0-1.14.22-2.24.67-3.28.44-1.01.13-1.54-.09-1.76-.23-.23-.77-.55-1.83-.11-4.09 1.72-6.62 5.82-6.32 10.21.3 4.13 3.2 7.66 7.04 8.99a10 10 0 0 0 2.89.55c.16.01.32.02.48.02 3.35 0 6.49-1.58 8.47-4.27.67-.93.49-1.52.32-1.79Z"
      fill={color}
    />
  </Svg>
);

export const ProfileIcon: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 15.0485 21.4801 17.8016 19.4425 19.7571C17.5117 21.61 14.8882 22.75 12 22.75C9.11182 22.75 6.48833 21.61 4.55751 19.7571C2.51989 17.8016 1.25 15.0485 1.25 12ZM18.0831 18.9685C17.6521 17.6792 16.4339 16.75 15 16.75H9C7.56613 16.75 6.34791 17.6792 5.91687 18.9685C7.54352 20.3898 9.67062 21.25 12 21.25C14.3294 21.25 16.4565 20.3898 18.0831 18.9685ZM12 4.25C9.37665 4.25 7.25 6.37665 7.25 9C7.25 11.6234 9.37665 13.75 12 13.75C14.6234 13.75 16.75 11.6234 16.75 9C16.75 6.37665 14.6234 4.25 12 4.25Z"
      fill={color}
    />
  </Svg>
);

export const HamBurgerIcon: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 5.25C4.58579 5.25 4.25 5.58579 4.25 6C4.25 6.41421 4.58579 6.75 5 6.75H19C19.4142 6.75 19.75 6.41421 19.75 6C19.75 5.58579 19.4142 5.25 19 5.25H5Z"
      fill={color}
    />
    <Path
      d="M5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75H19C19.4142 12.75 19.75 12.4142 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25H5Z"
      fill={color}
    />
    <Path
      d="M5 17.25C4.58579 17.25 4.25 17.5858 4.25 18C4.25 18.4142 4.58579 18.75 5 18.75H19C19.4142 18.75 19.75 18.4142 19.75 18C19.75 17.5858 19.4142 17.25 19 17.25H5Z"
      fill={color}
    />
  </Svg>
);

export const LogoutIcon: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 11.25C6.58579 11.25 6.25 11.5858 6.25 12C6.25 12.4142 6.58579 12.75 7 12.75L15 12.75L15 15C15 15.929 15 16.3935 14.9384 16.7822C14.5996 18.9216 12.9216 20.5996 10.7822 20.9384C10.3935 21 9.929 21 9 21C8.07099 21 7.60649 21 7.21783 20.9384C5.07836 20.5996 3.40041 18.9216 3.06156 16.7822C3 16.3935 3 15.929 3 15L3 9C3 8.07099 3 7.60649 3.06156 7.21783C3.40042 5.07836 5.07837 3.40042 7.21783 3.06156C7.60649 3 8.07099 3 9 3C9.92901 3 10.3935 3 10.7822 3.06156C12.9216 3.40042 14.5996 5.07836 14.9384 7.21783C15 7.60649 15 8.07099 15 9L15 11.25L7 11.25ZM15 11.25L19.8105 11.25C19.483 10.9273 19.001 10.5437 18.297 9.98553L16.534 8.58768C16.2095 8.33034 16.155 7.8586 16.4123 7.53403C16.6697 7.20946 17.1414 7.15497 17.466 7.41232L19.2648 8.83857C19.9372 9.37175 20.4922 9.81172 20.8875 10.2055C21.2932 10.6096 21.6294 11.0582 21.7208 11.6313C21.7402 11.7534 21.75 11.8766 21.75 12C21.75 12.1234 21.7402 12.2466 21.7208 12.3687C21.6294 12.9418 21.2932 13.3904 20.8875 13.7945C20.4922 14.1883 19.9373 14.6282 19.2648 15.1614L17.466 16.5877C17.1414 16.845 16.6697 16.7905 16.4123 16.466C16.155 16.1414 16.2095 15.6697 16.534 15.4123L18.297 14.0145C19.001 13.4563 19.483 13.0727 19.8105 12.75L15 12.75L15 11.25Z"
      fill={color}
    />
  </Svg>
);
