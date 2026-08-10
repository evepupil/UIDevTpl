import {
  Avatar as HeroAvatar,
  Badge as HeroBadge,
  Button as HeroButton,
  Input as HeroInput,
  type ButtonProps,
  type InputProps
} from "@heroui/react";
import type { LucideIcon } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";

const joinClassNames = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

export type QuietButtonProps = Omit<ButtonProps, "children" | "className"> & {
  children: ReactNode;
  className?: string;
  loading?: boolean;
};

export function QuietButton({ children, className, loading = false, isDisabled, ...props }: QuietButtonProps) {
  return (
    <HeroButton
      {...props}
      className={joinClassNames("qg-button", className)}
      isDisabled={isDisabled || loading}
    >
      {loading ? <LoaderCircle className="qg-spin" size={15} aria-hidden="true" /> : null}
      {children}
    </HeroButton>
  );
}

export interface QuietIconButtonProps extends Omit<QuietButtonProps, "children"> {
  icon: LucideIcon;
  label: string;
}

export function QuietIconButton({ className, icon: Icon, label, ...props }: QuietIconButtonProps) {
  return (
    <HeroButton
      {...props}
      aria-label={label}
      className={joinClassNames("qg-icon-button", className)}
      isIconOnly
      variant={props.variant ?? "tertiary"}
    >
      <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
    </HeroButton>
  );
}

export interface QuietFieldProps extends Omit<InputProps, "className"> {
  label: string;
  hint?: string;
  className?: string;
  errorMessage?: string;
  invalid?: boolean;
}

export function QuietField({ className, errorMessage, hint, invalid = false, label, ...props }: QuietFieldProps) {
  return (
    <label className={joinClassNames("qg-field", invalid && "qg-field--invalid")}>
      <span className="qg-field-label">{label}</span>
      <HeroInput {...props} className={joinClassNames("qg-input", className)} />
      {errorMessage ? <span className="qg-field-error">{errorMessage}</span> : hint ? <span className="qg-field-hint">{hint}</span> : null}
    </label>
  );
}

export function QuietBadge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "success" | "warning" | "danger" }) {
  return (
    <HeroBadge className={joinClassNames("qg-badge", `qg-badge--${tone}`)}>
      <span className="qg-badge-dot" aria-hidden="true" />
      {children}
    </HeroBadge>
  );
}

export function QuietAvatar({ initials, name, tone = "sage" }: { initials: string; name: string; tone?: "sage" | "coral" | "ink" }) {
  return (
    <HeroAvatar className={joinClassNames("qg-avatar", `qg-avatar--${tone}`)} aria-label={name}>
      <HeroAvatar.Fallback>{initials}</HeroAvatar.Fallback>
    </HeroAvatar>
  );
}

export function QuietDivider() {
  return <div className="qg-divider" role="separator" />;
}

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="qg-kbd">{children}</kbd>;
}
