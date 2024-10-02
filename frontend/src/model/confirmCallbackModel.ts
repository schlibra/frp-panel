export interface ConfirmCallbackModel {
    confirm?: () => void;
    cancel?: () => void;
    close?: () => void;
}