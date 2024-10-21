import { relations } from "drizzle-orm/relations"
import {
  users,
  customers,
  products,
  prices,
  subscriptions,
  workspaces,
  folders,
} from "./schema"

export const usersRelations = relations(users, ({ one }) => ({
  customer: one(customers, {
    fields: [users.id],
    references: [customers.id],
  }),
}))

export const customersRelations = relations(customers, ({ one }) => ({
  user: one(users, {
    fields: [customers.id],
    references: [users.id],
  }),
}))

export const pricesRelations = relations(prices, ({ one, many }) => ({
  product: one(products, {
    fields: [prices.productId],
    references: [products.id],
  }),
  subscriptions: many(subscriptions),
}))

export const productsRelations = relations(products, ({ many }) => ({
  prices: many(prices),
}))

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  price: one(prices, {
    fields: [subscriptions.priceId],
    references: [prices.id],
  }),
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}))

export const foldersRelations = relations(folders, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [folders.workspaceId],
    references: [workspaces.id],
  }),
}))

export const workspacesRelations = relations(workspaces, ({ many }) => ({
  folders: many(folders),
}))
