
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model CycleEntry
 * 
 */
export type CycleEntry = $Result.DefaultSelection<Prisma.$CycleEntryPayload>
/**
 * Model DailyLog
 * 
 */
export type DailyLog = $Result.DefaultSelection<Prisma.$DailyLogPayload>
/**
 * Model ForumPost
 * 
 */
export type ForumPost = $Result.DefaultSelection<Prisma.$ForumPostPayload>
/**
 * Model ForumComment
 * 
 */
export type ForumComment = $Result.DefaultSelection<Prisma.$ForumCommentPayload>
/**
 * Model ForumReaction
 * 
 */
export type ForumReaction = $Result.DefaultSelection<Prisma.$ForumReactionPayload>
/**
 * Model AssistantMessage
 * 
 */
export type AssistantMessage = $Result.DefaultSelection<Prisma.$AssistantMessagePayload>
/**
 * Model HealthCenter
 * 
 */
export type HealthCenter = $Result.DefaultSelection<Prisma.$HealthCenterPayload>
/**
 * Model HealthVoucher
 * 
 */
export type HealthVoucher = $Result.DefaultSelection<Prisma.$HealthVoucherPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more CycleEntries
 * const cycleEntries = await prisma.cycleEntry.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more CycleEntries
   * const cycleEntries = await prisma.cycleEntry.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.cycleEntry`: Exposes CRUD operations for the **CycleEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CycleEntries
    * const cycleEntries = await prisma.cycleEntry.findMany()
    * ```
    */
  get cycleEntry(): Prisma.CycleEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dailyLog`: Exposes CRUD operations for the **DailyLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyLogs
    * const dailyLogs = await prisma.dailyLog.findMany()
    * ```
    */
  get dailyLog(): Prisma.DailyLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.forumPost`: Exposes CRUD operations for the **ForumPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ForumPosts
    * const forumPosts = await prisma.forumPost.findMany()
    * ```
    */
  get forumPost(): Prisma.ForumPostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.forumComment`: Exposes CRUD operations for the **ForumComment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ForumComments
    * const forumComments = await prisma.forumComment.findMany()
    * ```
    */
  get forumComment(): Prisma.ForumCommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.forumReaction`: Exposes CRUD operations for the **ForumReaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ForumReactions
    * const forumReactions = await prisma.forumReaction.findMany()
    * ```
    */
  get forumReaction(): Prisma.ForumReactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assistantMessage`: Exposes CRUD operations for the **AssistantMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AssistantMessages
    * const assistantMessages = await prisma.assistantMessage.findMany()
    * ```
    */
  get assistantMessage(): Prisma.AssistantMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.healthCenter`: Exposes CRUD operations for the **HealthCenter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HealthCenters
    * const healthCenters = await prisma.healthCenter.findMany()
    * ```
    */
  get healthCenter(): Prisma.HealthCenterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.healthVoucher`: Exposes CRUD operations for the **HealthVoucher** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HealthVouchers
    * const healthVouchers = await prisma.healthVoucher.findMany()
    * ```
    */
  get healthVoucher(): Prisma.HealthVoucherDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    CycleEntry: 'CycleEntry',
    DailyLog: 'DailyLog',
    ForumPost: 'ForumPost',
    ForumComment: 'ForumComment',
    ForumReaction: 'ForumReaction',
    AssistantMessage: 'AssistantMessage',
    HealthCenter: 'HealthCenter',
    HealthVoucher: 'HealthVoucher'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "cycleEntry" | "dailyLog" | "forumPost" | "forumComment" | "forumReaction" | "assistantMessage" | "healthCenter" | "healthVoucher"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      CycleEntry: {
        payload: Prisma.$CycleEntryPayload<ExtArgs>
        fields: Prisma.CycleEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CycleEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CycleEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CycleEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CycleEntryPayload>
          }
          findFirst: {
            args: Prisma.CycleEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CycleEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CycleEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CycleEntryPayload>
          }
          findMany: {
            args: Prisma.CycleEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CycleEntryPayload>[]
          }
          create: {
            args: Prisma.CycleEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CycleEntryPayload>
          }
          createMany: {
            args: Prisma.CycleEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CycleEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CycleEntryPayload>[]
          }
          delete: {
            args: Prisma.CycleEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CycleEntryPayload>
          }
          update: {
            args: Prisma.CycleEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CycleEntryPayload>
          }
          deleteMany: {
            args: Prisma.CycleEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CycleEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CycleEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CycleEntryPayload>[]
          }
          upsert: {
            args: Prisma.CycleEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CycleEntryPayload>
          }
          aggregate: {
            args: Prisma.CycleEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCycleEntry>
          }
          groupBy: {
            args: Prisma.CycleEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CycleEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CycleEntryCountArgs<ExtArgs>
            result: $Utils.Optional<CycleEntryCountAggregateOutputType> | number
          }
        }
      }
      DailyLog: {
        payload: Prisma.$DailyLogPayload<ExtArgs>
        fields: Prisma.DailyLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyLogPayload>
          }
          findFirst: {
            args: Prisma.DailyLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyLogPayload>
          }
          findMany: {
            args: Prisma.DailyLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyLogPayload>[]
          }
          create: {
            args: Prisma.DailyLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyLogPayload>
          }
          createMany: {
            args: Prisma.DailyLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyLogPayload>[]
          }
          delete: {
            args: Prisma.DailyLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyLogPayload>
          }
          update: {
            args: Prisma.DailyLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyLogPayload>
          }
          deleteMany: {
            args: Prisma.DailyLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DailyLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyLogPayload>[]
          }
          upsert: {
            args: Prisma.DailyLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyLogPayload>
          }
          aggregate: {
            args: Prisma.DailyLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyLog>
          }
          groupBy: {
            args: Prisma.DailyLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyLogCountArgs<ExtArgs>
            result: $Utils.Optional<DailyLogCountAggregateOutputType> | number
          }
        }
      }
      ForumPost: {
        payload: Prisma.$ForumPostPayload<ExtArgs>
        fields: Prisma.ForumPostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ForumPostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumPostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ForumPostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumPostPayload>
          }
          findFirst: {
            args: Prisma.ForumPostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumPostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ForumPostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumPostPayload>
          }
          findMany: {
            args: Prisma.ForumPostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumPostPayload>[]
          }
          create: {
            args: Prisma.ForumPostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumPostPayload>
          }
          createMany: {
            args: Prisma.ForumPostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ForumPostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumPostPayload>[]
          }
          delete: {
            args: Prisma.ForumPostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumPostPayload>
          }
          update: {
            args: Prisma.ForumPostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumPostPayload>
          }
          deleteMany: {
            args: Prisma.ForumPostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ForumPostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ForumPostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumPostPayload>[]
          }
          upsert: {
            args: Prisma.ForumPostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumPostPayload>
          }
          aggregate: {
            args: Prisma.ForumPostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateForumPost>
          }
          groupBy: {
            args: Prisma.ForumPostGroupByArgs<ExtArgs>
            result: $Utils.Optional<ForumPostGroupByOutputType>[]
          }
          count: {
            args: Prisma.ForumPostCountArgs<ExtArgs>
            result: $Utils.Optional<ForumPostCountAggregateOutputType> | number
          }
        }
      }
      ForumComment: {
        payload: Prisma.$ForumCommentPayload<ExtArgs>
        fields: Prisma.ForumCommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ForumCommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumCommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ForumCommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumCommentPayload>
          }
          findFirst: {
            args: Prisma.ForumCommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumCommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ForumCommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumCommentPayload>
          }
          findMany: {
            args: Prisma.ForumCommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumCommentPayload>[]
          }
          create: {
            args: Prisma.ForumCommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumCommentPayload>
          }
          createMany: {
            args: Prisma.ForumCommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ForumCommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumCommentPayload>[]
          }
          delete: {
            args: Prisma.ForumCommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumCommentPayload>
          }
          update: {
            args: Prisma.ForumCommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumCommentPayload>
          }
          deleteMany: {
            args: Prisma.ForumCommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ForumCommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ForumCommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumCommentPayload>[]
          }
          upsert: {
            args: Prisma.ForumCommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumCommentPayload>
          }
          aggregate: {
            args: Prisma.ForumCommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateForumComment>
          }
          groupBy: {
            args: Prisma.ForumCommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ForumCommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ForumCommentCountArgs<ExtArgs>
            result: $Utils.Optional<ForumCommentCountAggregateOutputType> | number
          }
        }
      }
      ForumReaction: {
        payload: Prisma.$ForumReactionPayload<ExtArgs>
        fields: Prisma.ForumReactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ForumReactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumReactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ForumReactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumReactionPayload>
          }
          findFirst: {
            args: Prisma.ForumReactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumReactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ForumReactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumReactionPayload>
          }
          findMany: {
            args: Prisma.ForumReactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumReactionPayload>[]
          }
          create: {
            args: Prisma.ForumReactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumReactionPayload>
          }
          createMany: {
            args: Prisma.ForumReactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ForumReactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumReactionPayload>[]
          }
          delete: {
            args: Prisma.ForumReactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumReactionPayload>
          }
          update: {
            args: Prisma.ForumReactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumReactionPayload>
          }
          deleteMany: {
            args: Prisma.ForumReactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ForumReactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ForumReactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumReactionPayload>[]
          }
          upsert: {
            args: Prisma.ForumReactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumReactionPayload>
          }
          aggregate: {
            args: Prisma.ForumReactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateForumReaction>
          }
          groupBy: {
            args: Prisma.ForumReactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ForumReactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ForumReactionCountArgs<ExtArgs>
            result: $Utils.Optional<ForumReactionCountAggregateOutputType> | number
          }
        }
      }
      AssistantMessage: {
        payload: Prisma.$AssistantMessagePayload<ExtArgs>
        fields: Prisma.AssistantMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssistantMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssistantMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantMessagePayload>
          }
          findFirst: {
            args: Prisma.AssistantMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssistantMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantMessagePayload>
          }
          findMany: {
            args: Prisma.AssistantMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantMessagePayload>[]
          }
          create: {
            args: Prisma.AssistantMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantMessagePayload>
          }
          createMany: {
            args: Prisma.AssistantMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssistantMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantMessagePayload>[]
          }
          delete: {
            args: Prisma.AssistantMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantMessagePayload>
          }
          update: {
            args: Prisma.AssistantMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantMessagePayload>
          }
          deleteMany: {
            args: Prisma.AssistantMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssistantMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssistantMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantMessagePayload>[]
          }
          upsert: {
            args: Prisma.AssistantMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistantMessagePayload>
          }
          aggregate: {
            args: Prisma.AssistantMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssistantMessage>
          }
          groupBy: {
            args: Prisma.AssistantMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssistantMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssistantMessageCountArgs<ExtArgs>
            result: $Utils.Optional<AssistantMessageCountAggregateOutputType> | number
          }
        }
      }
      HealthCenter: {
        payload: Prisma.$HealthCenterPayload<ExtArgs>
        fields: Prisma.HealthCenterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HealthCenterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthCenterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HealthCenterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthCenterPayload>
          }
          findFirst: {
            args: Prisma.HealthCenterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthCenterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HealthCenterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthCenterPayload>
          }
          findMany: {
            args: Prisma.HealthCenterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthCenterPayload>[]
          }
          create: {
            args: Prisma.HealthCenterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthCenterPayload>
          }
          createMany: {
            args: Prisma.HealthCenterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HealthCenterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthCenterPayload>[]
          }
          delete: {
            args: Prisma.HealthCenterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthCenterPayload>
          }
          update: {
            args: Prisma.HealthCenterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthCenterPayload>
          }
          deleteMany: {
            args: Prisma.HealthCenterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HealthCenterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HealthCenterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthCenterPayload>[]
          }
          upsert: {
            args: Prisma.HealthCenterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthCenterPayload>
          }
          aggregate: {
            args: Prisma.HealthCenterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHealthCenter>
          }
          groupBy: {
            args: Prisma.HealthCenterGroupByArgs<ExtArgs>
            result: $Utils.Optional<HealthCenterGroupByOutputType>[]
          }
          count: {
            args: Prisma.HealthCenterCountArgs<ExtArgs>
            result: $Utils.Optional<HealthCenterCountAggregateOutputType> | number
          }
        }
      }
      HealthVoucher: {
        payload: Prisma.$HealthVoucherPayload<ExtArgs>
        fields: Prisma.HealthVoucherFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HealthVoucherFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthVoucherPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HealthVoucherFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthVoucherPayload>
          }
          findFirst: {
            args: Prisma.HealthVoucherFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthVoucherPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HealthVoucherFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthVoucherPayload>
          }
          findMany: {
            args: Prisma.HealthVoucherFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthVoucherPayload>[]
          }
          create: {
            args: Prisma.HealthVoucherCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthVoucherPayload>
          }
          createMany: {
            args: Prisma.HealthVoucherCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HealthVoucherCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthVoucherPayload>[]
          }
          delete: {
            args: Prisma.HealthVoucherDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthVoucherPayload>
          }
          update: {
            args: Prisma.HealthVoucherUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthVoucherPayload>
          }
          deleteMany: {
            args: Prisma.HealthVoucherDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HealthVoucherUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HealthVoucherUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthVoucherPayload>[]
          }
          upsert: {
            args: Prisma.HealthVoucherUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthVoucherPayload>
          }
          aggregate: {
            args: Prisma.HealthVoucherAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHealthVoucher>
          }
          groupBy: {
            args: Prisma.HealthVoucherGroupByArgs<ExtArgs>
            result: $Utils.Optional<HealthVoucherGroupByOutputType>[]
          }
          count: {
            args: Prisma.HealthVoucherCountArgs<ExtArgs>
            result: $Utils.Optional<HealthVoucherCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    cycleEntry?: CycleEntryOmit
    dailyLog?: DailyLogOmit
    forumPost?: ForumPostOmit
    forumComment?: ForumCommentOmit
    forumReaction?: ForumReactionOmit
    assistantMessage?: AssistantMessageOmit
    healthCenter?: HealthCenterOmit
    healthVoucher?: HealthVoucherOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ForumPostCountOutputType
   */

  export type ForumPostCountOutputType = {
    comments: number
    reactions: number
  }

  export type ForumPostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | ForumPostCountOutputTypeCountCommentsArgs
    reactions?: boolean | ForumPostCountOutputTypeCountReactionsArgs
  }

  // Custom InputTypes
  /**
   * ForumPostCountOutputType without action
   */
  export type ForumPostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPostCountOutputType
     */
    select?: ForumPostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ForumPostCountOutputType without action
   */
  export type ForumPostCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ForumCommentWhereInput
  }

  /**
   * ForumPostCountOutputType without action
   */
  export type ForumPostCountOutputTypeCountReactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ForumReactionWhereInput
  }


  /**
   * Count Type HealthCenterCountOutputType
   */

  export type HealthCenterCountOutputType = {
    vouchers: number
  }

  export type HealthCenterCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vouchers?: boolean | HealthCenterCountOutputTypeCountVouchersArgs
  }

  // Custom InputTypes
  /**
   * HealthCenterCountOutputType without action
   */
  export type HealthCenterCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthCenterCountOutputType
     */
    select?: HealthCenterCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * HealthCenterCountOutputType without action
   */
  export type HealthCenterCountOutputTypeCountVouchersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HealthVoucherWhereInput
  }


  /**
   * Models
   */

  /**
   * Model CycleEntry
   */

  export type AggregateCycleEntry = {
    _count: CycleEntryCountAggregateOutputType | null
    _avg: CycleEntryAvgAggregateOutputType | null
    _sum: CycleEntrySumAggregateOutputType | null
    _min: CycleEntryMinAggregateOutputType | null
    _max: CycleEntryMaxAggregateOutputType | null
  }

  export type CycleEntryAvgAggregateOutputType = {
    cycleLength: number | null
    periodLength: number | null
  }

  export type CycleEntrySumAggregateOutputType = {
    cycleLength: number | null
    periodLength: number | null
  }

  export type CycleEntryMinAggregateOutputType = {
    id: string | null
    anonId: string | null
    startDate: Date | null
    endDate: Date | null
    cycleLength: number | null
    periodLength: number | null
    flowIntensity: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CycleEntryMaxAggregateOutputType = {
    id: string | null
    anonId: string | null
    startDate: Date | null
    endDate: Date | null
    cycleLength: number | null
    periodLength: number | null
    flowIntensity: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CycleEntryCountAggregateOutputType = {
    id: number
    anonId: number
    startDate: number
    endDate: number
    cycleLength: number
    periodLength: number
    flowIntensity: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CycleEntryAvgAggregateInputType = {
    cycleLength?: true
    periodLength?: true
  }

  export type CycleEntrySumAggregateInputType = {
    cycleLength?: true
    periodLength?: true
  }

  export type CycleEntryMinAggregateInputType = {
    id?: true
    anonId?: true
    startDate?: true
    endDate?: true
    cycleLength?: true
    periodLength?: true
    flowIntensity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CycleEntryMaxAggregateInputType = {
    id?: true
    anonId?: true
    startDate?: true
    endDate?: true
    cycleLength?: true
    periodLength?: true
    flowIntensity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CycleEntryCountAggregateInputType = {
    id?: true
    anonId?: true
    startDate?: true
    endDate?: true
    cycleLength?: true
    periodLength?: true
    flowIntensity?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CycleEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CycleEntry to aggregate.
     */
    where?: CycleEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CycleEntries to fetch.
     */
    orderBy?: CycleEntryOrderByWithRelationInput | CycleEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CycleEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CycleEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CycleEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CycleEntries
    **/
    _count?: true | CycleEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CycleEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CycleEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CycleEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CycleEntryMaxAggregateInputType
  }

  export type GetCycleEntryAggregateType<T extends CycleEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateCycleEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCycleEntry[P]>
      : GetScalarType<T[P], AggregateCycleEntry[P]>
  }




  export type CycleEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CycleEntryWhereInput
    orderBy?: CycleEntryOrderByWithAggregationInput | CycleEntryOrderByWithAggregationInput[]
    by: CycleEntryScalarFieldEnum[] | CycleEntryScalarFieldEnum
    having?: CycleEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CycleEntryCountAggregateInputType | true
    _avg?: CycleEntryAvgAggregateInputType
    _sum?: CycleEntrySumAggregateInputType
    _min?: CycleEntryMinAggregateInputType
    _max?: CycleEntryMaxAggregateInputType
  }

  export type CycleEntryGroupByOutputType = {
    id: string
    anonId: string
    startDate: Date
    endDate: Date | null
    cycleLength: number | null
    periodLength: number | null
    flowIntensity: string | null
    createdAt: Date
    updatedAt: Date
    _count: CycleEntryCountAggregateOutputType | null
    _avg: CycleEntryAvgAggregateOutputType | null
    _sum: CycleEntrySumAggregateOutputType | null
    _min: CycleEntryMinAggregateOutputType | null
    _max: CycleEntryMaxAggregateOutputType | null
  }

  type GetCycleEntryGroupByPayload<T extends CycleEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CycleEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CycleEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CycleEntryGroupByOutputType[P]>
            : GetScalarType<T[P], CycleEntryGroupByOutputType[P]>
        }
      >
    >


  export type CycleEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    anonId?: boolean
    startDate?: boolean
    endDate?: boolean
    cycleLength?: boolean
    periodLength?: boolean
    flowIntensity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cycleEntry"]>

  export type CycleEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    anonId?: boolean
    startDate?: boolean
    endDate?: boolean
    cycleLength?: boolean
    periodLength?: boolean
    flowIntensity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cycleEntry"]>

  export type CycleEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    anonId?: boolean
    startDate?: boolean
    endDate?: boolean
    cycleLength?: boolean
    periodLength?: boolean
    flowIntensity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cycleEntry"]>

  export type CycleEntrySelectScalar = {
    id?: boolean
    anonId?: boolean
    startDate?: boolean
    endDate?: boolean
    cycleLength?: boolean
    periodLength?: boolean
    flowIntensity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CycleEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "anonId" | "startDate" | "endDate" | "cycleLength" | "periodLength" | "flowIntensity" | "createdAt" | "updatedAt", ExtArgs["result"]["cycleEntry"]>

  export type $CycleEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CycleEntry"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      anonId: string
      startDate: Date
      endDate: Date | null
      cycleLength: number | null
      periodLength: number | null
      flowIntensity: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cycleEntry"]>
    composites: {}
  }

  type CycleEntryGetPayload<S extends boolean | null | undefined | CycleEntryDefaultArgs> = $Result.GetResult<Prisma.$CycleEntryPayload, S>

  type CycleEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CycleEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CycleEntryCountAggregateInputType | true
    }

  export interface CycleEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CycleEntry'], meta: { name: 'CycleEntry' } }
    /**
     * Find zero or one CycleEntry that matches the filter.
     * @param {CycleEntryFindUniqueArgs} args - Arguments to find a CycleEntry
     * @example
     * // Get one CycleEntry
     * const cycleEntry = await prisma.cycleEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CycleEntryFindUniqueArgs>(args: SelectSubset<T, CycleEntryFindUniqueArgs<ExtArgs>>): Prisma__CycleEntryClient<$Result.GetResult<Prisma.$CycleEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CycleEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CycleEntryFindUniqueOrThrowArgs} args - Arguments to find a CycleEntry
     * @example
     * // Get one CycleEntry
     * const cycleEntry = await prisma.cycleEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CycleEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, CycleEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CycleEntryClient<$Result.GetResult<Prisma.$CycleEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CycleEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CycleEntryFindFirstArgs} args - Arguments to find a CycleEntry
     * @example
     * // Get one CycleEntry
     * const cycleEntry = await prisma.cycleEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CycleEntryFindFirstArgs>(args?: SelectSubset<T, CycleEntryFindFirstArgs<ExtArgs>>): Prisma__CycleEntryClient<$Result.GetResult<Prisma.$CycleEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CycleEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CycleEntryFindFirstOrThrowArgs} args - Arguments to find a CycleEntry
     * @example
     * // Get one CycleEntry
     * const cycleEntry = await prisma.cycleEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CycleEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, CycleEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CycleEntryClient<$Result.GetResult<Prisma.$CycleEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CycleEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CycleEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CycleEntries
     * const cycleEntries = await prisma.cycleEntry.findMany()
     * 
     * // Get first 10 CycleEntries
     * const cycleEntries = await prisma.cycleEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cycleEntryWithIdOnly = await prisma.cycleEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CycleEntryFindManyArgs>(args?: SelectSubset<T, CycleEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CycleEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CycleEntry.
     * @param {CycleEntryCreateArgs} args - Arguments to create a CycleEntry.
     * @example
     * // Create one CycleEntry
     * const CycleEntry = await prisma.cycleEntry.create({
     *   data: {
     *     // ... data to create a CycleEntry
     *   }
     * })
     * 
     */
    create<T extends CycleEntryCreateArgs>(args: SelectSubset<T, CycleEntryCreateArgs<ExtArgs>>): Prisma__CycleEntryClient<$Result.GetResult<Prisma.$CycleEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CycleEntries.
     * @param {CycleEntryCreateManyArgs} args - Arguments to create many CycleEntries.
     * @example
     * // Create many CycleEntries
     * const cycleEntry = await prisma.cycleEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CycleEntryCreateManyArgs>(args?: SelectSubset<T, CycleEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CycleEntries and returns the data saved in the database.
     * @param {CycleEntryCreateManyAndReturnArgs} args - Arguments to create many CycleEntries.
     * @example
     * // Create many CycleEntries
     * const cycleEntry = await prisma.cycleEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CycleEntries and only return the `id`
     * const cycleEntryWithIdOnly = await prisma.cycleEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CycleEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, CycleEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CycleEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CycleEntry.
     * @param {CycleEntryDeleteArgs} args - Arguments to delete one CycleEntry.
     * @example
     * // Delete one CycleEntry
     * const CycleEntry = await prisma.cycleEntry.delete({
     *   where: {
     *     // ... filter to delete one CycleEntry
     *   }
     * })
     * 
     */
    delete<T extends CycleEntryDeleteArgs>(args: SelectSubset<T, CycleEntryDeleteArgs<ExtArgs>>): Prisma__CycleEntryClient<$Result.GetResult<Prisma.$CycleEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CycleEntry.
     * @param {CycleEntryUpdateArgs} args - Arguments to update one CycleEntry.
     * @example
     * // Update one CycleEntry
     * const cycleEntry = await prisma.cycleEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CycleEntryUpdateArgs>(args: SelectSubset<T, CycleEntryUpdateArgs<ExtArgs>>): Prisma__CycleEntryClient<$Result.GetResult<Prisma.$CycleEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CycleEntries.
     * @param {CycleEntryDeleteManyArgs} args - Arguments to filter CycleEntries to delete.
     * @example
     * // Delete a few CycleEntries
     * const { count } = await prisma.cycleEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CycleEntryDeleteManyArgs>(args?: SelectSubset<T, CycleEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CycleEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CycleEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CycleEntries
     * const cycleEntry = await prisma.cycleEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CycleEntryUpdateManyArgs>(args: SelectSubset<T, CycleEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CycleEntries and returns the data updated in the database.
     * @param {CycleEntryUpdateManyAndReturnArgs} args - Arguments to update many CycleEntries.
     * @example
     * // Update many CycleEntries
     * const cycleEntry = await prisma.cycleEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CycleEntries and only return the `id`
     * const cycleEntryWithIdOnly = await prisma.cycleEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CycleEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, CycleEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CycleEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CycleEntry.
     * @param {CycleEntryUpsertArgs} args - Arguments to update or create a CycleEntry.
     * @example
     * // Update or create a CycleEntry
     * const cycleEntry = await prisma.cycleEntry.upsert({
     *   create: {
     *     // ... data to create a CycleEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CycleEntry we want to update
     *   }
     * })
     */
    upsert<T extends CycleEntryUpsertArgs>(args: SelectSubset<T, CycleEntryUpsertArgs<ExtArgs>>): Prisma__CycleEntryClient<$Result.GetResult<Prisma.$CycleEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CycleEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CycleEntryCountArgs} args - Arguments to filter CycleEntries to count.
     * @example
     * // Count the number of CycleEntries
     * const count = await prisma.cycleEntry.count({
     *   where: {
     *     // ... the filter for the CycleEntries we want to count
     *   }
     * })
    **/
    count<T extends CycleEntryCountArgs>(
      args?: Subset<T, CycleEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CycleEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CycleEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CycleEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CycleEntryAggregateArgs>(args: Subset<T, CycleEntryAggregateArgs>): Prisma.PrismaPromise<GetCycleEntryAggregateType<T>>

    /**
     * Group by CycleEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CycleEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CycleEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CycleEntryGroupByArgs['orderBy'] }
        : { orderBy?: CycleEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CycleEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCycleEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CycleEntry model
   */
  readonly fields: CycleEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CycleEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CycleEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CycleEntry model
   */
  interface CycleEntryFieldRefs {
    readonly id: FieldRef<"CycleEntry", 'String'>
    readonly anonId: FieldRef<"CycleEntry", 'String'>
    readonly startDate: FieldRef<"CycleEntry", 'DateTime'>
    readonly endDate: FieldRef<"CycleEntry", 'DateTime'>
    readonly cycleLength: FieldRef<"CycleEntry", 'Int'>
    readonly periodLength: FieldRef<"CycleEntry", 'Int'>
    readonly flowIntensity: FieldRef<"CycleEntry", 'String'>
    readonly createdAt: FieldRef<"CycleEntry", 'DateTime'>
    readonly updatedAt: FieldRef<"CycleEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CycleEntry findUnique
   */
  export type CycleEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CycleEntry
     */
    select?: CycleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CycleEntry
     */
    omit?: CycleEntryOmit<ExtArgs> | null
    /**
     * Filter, which CycleEntry to fetch.
     */
    where: CycleEntryWhereUniqueInput
  }

  /**
   * CycleEntry findUniqueOrThrow
   */
  export type CycleEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CycleEntry
     */
    select?: CycleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CycleEntry
     */
    omit?: CycleEntryOmit<ExtArgs> | null
    /**
     * Filter, which CycleEntry to fetch.
     */
    where: CycleEntryWhereUniqueInput
  }

  /**
   * CycleEntry findFirst
   */
  export type CycleEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CycleEntry
     */
    select?: CycleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CycleEntry
     */
    omit?: CycleEntryOmit<ExtArgs> | null
    /**
     * Filter, which CycleEntry to fetch.
     */
    where?: CycleEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CycleEntries to fetch.
     */
    orderBy?: CycleEntryOrderByWithRelationInput | CycleEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CycleEntries.
     */
    cursor?: CycleEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CycleEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CycleEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CycleEntries.
     */
    distinct?: CycleEntryScalarFieldEnum | CycleEntryScalarFieldEnum[]
  }

  /**
   * CycleEntry findFirstOrThrow
   */
  export type CycleEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CycleEntry
     */
    select?: CycleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CycleEntry
     */
    omit?: CycleEntryOmit<ExtArgs> | null
    /**
     * Filter, which CycleEntry to fetch.
     */
    where?: CycleEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CycleEntries to fetch.
     */
    orderBy?: CycleEntryOrderByWithRelationInput | CycleEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CycleEntries.
     */
    cursor?: CycleEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CycleEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CycleEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CycleEntries.
     */
    distinct?: CycleEntryScalarFieldEnum | CycleEntryScalarFieldEnum[]
  }

  /**
   * CycleEntry findMany
   */
  export type CycleEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CycleEntry
     */
    select?: CycleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CycleEntry
     */
    omit?: CycleEntryOmit<ExtArgs> | null
    /**
     * Filter, which CycleEntries to fetch.
     */
    where?: CycleEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CycleEntries to fetch.
     */
    orderBy?: CycleEntryOrderByWithRelationInput | CycleEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CycleEntries.
     */
    cursor?: CycleEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CycleEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CycleEntries.
     */
    skip?: number
    distinct?: CycleEntryScalarFieldEnum | CycleEntryScalarFieldEnum[]
  }

  /**
   * CycleEntry create
   */
  export type CycleEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CycleEntry
     */
    select?: CycleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CycleEntry
     */
    omit?: CycleEntryOmit<ExtArgs> | null
    /**
     * The data needed to create a CycleEntry.
     */
    data: XOR<CycleEntryCreateInput, CycleEntryUncheckedCreateInput>
  }

  /**
   * CycleEntry createMany
   */
  export type CycleEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CycleEntries.
     */
    data: CycleEntryCreateManyInput | CycleEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CycleEntry createManyAndReturn
   */
  export type CycleEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CycleEntry
     */
    select?: CycleEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CycleEntry
     */
    omit?: CycleEntryOmit<ExtArgs> | null
    /**
     * The data used to create many CycleEntries.
     */
    data: CycleEntryCreateManyInput | CycleEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CycleEntry update
   */
  export type CycleEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CycleEntry
     */
    select?: CycleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CycleEntry
     */
    omit?: CycleEntryOmit<ExtArgs> | null
    /**
     * The data needed to update a CycleEntry.
     */
    data: XOR<CycleEntryUpdateInput, CycleEntryUncheckedUpdateInput>
    /**
     * Choose, which CycleEntry to update.
     */
    where: CycleEntryWhereUniqueInput
  }

  /**
   * CycleEntry updateMany
   */
  export type CycleEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CycleEntries.
     */
    data: XOR<CycleEntryUpdateManyMutationInput, CycleEntryUncheckedUpdateManyInput>
    /**
     * Filter which CycleEntries to update
     */
    where?: CycleEntryWhereInput
    /**
     * Limit how many CycleEntries to update.
     */
    limit?: number
  }

  /**
   * CycleEntry updateManyAndReturn
   */
  export type CycleEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CycleEntry
     */
    select?: CycleEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CycleEntry
     */
    omit?: CycleEntryOmit<ExtArgs> | null
    /**
     * The data used to update CycleEntries.
     */
    data: XOR<CycleEntryUpdateManyMutationInput, CycleEntryUncheckedUpdateManyInput>
    /**
     * Filter which CycleEntries to update
     */
    where?: CycleEntryWhereInput
    /**
     * Limit how many CycleEntries to update.
     */
    limit?: number
  }

  /**
   * CycleEntry upsert
   */
  export type CycleEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CycleEntry
     */
    select?: CycleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CycleEntry
     */
    omit?: CycleEntryOmit<ExtArgs> | null
    /**
     * The filter to search for the CycleEntry to update in case it exists.
     */
    where: CycleEntryWhereUniqueInput
    /**
     * In case the CycleEntry found by the `where` argument doesn't exist, create a new CycleEntry with this data.
     */
    create: XOR<CycleEntryCreateInput, CycleEntryUncheckedCreateInput>
    /**
     * In case the CycleEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CycleEntryUpdateInput, CycleEntryUncheckedUpdateInput>
  }

  /**
   * CycleEntry delete
   */
  export type CycleEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CycleEntry
     */
    select?: CycleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CycleEntry
     */
    omit?: CycleEntryOmit<ExtArgs> | null
    /**
     * Filter which CycleEntry to delete.
     */
    where: CycleEntryWhereUniqueInput
  }

  /**
   * CycleEntry deleteMany
   */
  export type CycleEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CycleEntries to delete
     */
    where?: CycleEntryWhereInput
    /**
     * Limit how many CycleEntries to delete.
     */
    limit?: number
  }

  /**
   * CycleEntry without action
   */
  export type CycleEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CycleEntry
     */
    select?: CycleEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CycleEntry
     */
    omit?: CycleEntryOmit<ExtArgs> | null
  }


  /**
   * Model DailyLog
   */

  export type AggregateDailyLog = {
    _count: DailyLogCountAggregateOutputType | null
    _min: DailyLogMinAggregateOutputType | null
    _max: DailyLogMaxAggregateOutputType | null
  }

  export type DailyLogMinAggregateOutputType = {
    id: string | null
    anonId: string | null
    date: Date | null
    mood: string | null
    encryptedNotes: string | null
    notesIv: string | null
    notesAuthTag: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyLogMaxAggregateOutputType = {
    id: string | null
    anonId: string | null
    date: Date | null
    mood: string | null
    encryptedNotes: string | null
    notesIv: string | null
    notesAuthTag: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyLogCountAggregateOutputType = {
    id: number
    anonId: number
    date: number
    mood: number
    symptoms: number
    encryptedNotes: number
    notesIv: number
    notesAuthTag: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DailyLogMinAggregateInputType = {
    id?: true
    anonId?: true
    date?: true
    mood?: true
    encryptedNotes?: true
    notesIv?: true
    notesAuthTag?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyLogMaxAggregateInputType = {
    id?: true
    anonId?: true
    date?: true
    mood?: true
    encryptedNotes?: true
    notesIv?: true
    notesAuthTag?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyLogCountAggregateInputType = {
    id?: true
    anonId?: true
    date?: true
    mood?: true
    symptoms?: true
    encryptedNotes?: true
    notesIv?: true
    notesAuthTag?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DailyLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyLog to aggregate.
     */
    where?: DailyLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyLogs to fetch.
     */
    orderBy?: DailyLogOrderByWithRelationInput | DailyLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyLogs
    **/
    _count?: true | DailyLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyLogMaxAggregateInputType
  }

  export type GetDailyLogAggregateType<T extends DailyLogAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyLog[P]>
      : GetScalarType<T[P], AggregateDailyLog[P]>
  }




  export type DailyLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyLogWhereInput
    orderBy?: DailyLogOrderByWithAggregationInput | DailyLogOrderByWithAggregationInput[]
    by: DailyLogScalarFieldEnum[] | DailyLogScalarFieldEnum
    having?: DailyLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyLogCountAggregateInputType | true
    _min?: DailyLogMinAggregateInputType
    _max?: DailyLogMaxAggregateInputType
  }

  export type DailyLogGroupByOutputType = {
    id: string
    anonId: string
    date: Date
    mood: string | null
    symptoms: string[]
    encryptedNotes: string | null
    notesIv: string | null
    notesAuthTag: string | null
    createdAt: Date
    updatedAt: Date
    _count: DailyLogCountAggregateOutputType | null
    _min: DailyLogMinAggregateOutputType | null
    _max: DailyLogMaxAggregateOutputType | null
  }

  type GetDailyLogGroupByPayload<T extends DailyLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyLogGroupByOutputType[P]>
            : GetScalarType<T[P], DailyLogGroupByOutputType[P]>
        }
      >
    >


  export type DailyLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    anonId?: boolean
    date?: boolean
    mood?: boolean
    symptoms?: boolean
    encryptedNotes?: boolean
    notesIv?: boolean
    notesAuthTag?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dailyLog"]>

  export type DailyLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    anonId?: boolean
    date?: boolean
    mood?: boolean
    symptoms?: boolean
    encryptedNotes?: boolean
    notesIv?: boolean
    notesAuthTag?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dailyLog"]>

  export type DailyLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    anonId?: boolean
    date?: boolean
    mood?: boolean
    symptoms?: boolean
    encryptedNotes?: boolean
    notesIv?: boolean
    notesAuthTag?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dailyLog"]>

  export type DailyLogSelectScalar = {
    id?: boolean
    anonId?: boolean
    date?: boolean
    mood?: boolean
    symptoms?: boolean
    encryptedNotes?: boolean
    notesIv?: boolean
    notesAuthTag?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DailyLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "anonId" | "date" | "mood" | "symptoms" | "encryptedNotes" | "notesIv" | "notesAuthTag" | "createdAt" | "updatedAt", ExtArgs["result"]["dailyLog"]>

  export type $DailyLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      anonId: string
      date: Date
      mood: string | null
      symptoms: string[]
      encryptedNotes: string | null
      notesIv: string | null
      notesAuthTag: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dailyLog"]>
    composites: {}
  }

  type DailyLogGetPayload<S extends boolean | null | undefined | DailyLogDefaultArgs> = $Result.GetResult<Prisma.$DailyLogPayload, S>

  type DailyLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DailyLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DailyLogCountAggregateInputType | true
    }

  export interface DailyLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyLog'], meta: { name: 'DailyLog' } }
    /**
     * Find zero or one DailyLog that matches the filter.
     * @param {DailyLogFindUniqueArgs} args - Arguments to find a DailyLog
     * @example
     * // Get one DailyLog
     * const dailyLog = await prisma.dailyLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyLogFindUniqueArgs>(args: SelectSubset<T, DailyLogFindUniqueArgs<ExtArgs>>): Prisma__DailyLogClient<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DailyLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DailyLogFindUniqueOrThrowArgs} args - Arguments to find a DailyLog
     * @example
     * // Get one DailyLog
     * const dailyLog = await prisma.dailyLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyLogFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyLogClient<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyLogFindFirstArgs} args - Arguments to find a DailyLog
     * @example
     * // Get one DailyLog
     * const dailyLog = await prisma.dailyLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyLogFindFirstArgs>(args?: SelectSubset<T, DailyLogFindFirstArgs<ExtArgs>>): Prisma__DailyLogClient<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyLogFindFirstOrThrowArgs} args - Arguments to find a DailyLog
     * @example
     * // Get one DailyLog
     * const dailyLog = await prisma.dailyLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyLogFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyLogClient<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DailyLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyLogs
     * const dailyLogs = await prisma.dailyLog.findMany()
     * 
     * // Get first 10 DailyLogs
     * const dailyLogs = await prisma.dailyLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dailyLogWithIdOnly = await prisma.dailyLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DailyLogFindManyArgs>(args?: SelectSubset<T, DailyLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DailyLog.
     * @param {DailyLogCreateArgs} args - Arguments to create a DailyLog.
     * @example
     * // Create one DailyLog
     * const DailyLog = await prisma.dailyLog.create({
     *   data: {
     *     // ... data to create a DailyLog
     *   }
     * })
     * 
     */
    create<T extends DailyLogCreateArgs>(args: SelectSubset<T, DailyLogCreateArgs<ExtArgs>>): Prisma__DailyLogClient<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DailyLogs.
     * @param {DailyLogCreateManyArgs} args - Arguments to create many DailyLogs.
     * @example
     * // Create many DailyLogs
     * const dailyLog = await prisma.dailyLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyLogCreateManyArgs>(args?: SelectSubset<T, DailyLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyLogs and returns the data saved in the database.
     * @param {DailyLogCreateManyAndReturnArgs} args - Arguments to create many DailyLogs.
     * @example
     * // Create many DailyLogs
     * const dailyLog = await prisma.dailyLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyLogs and only return the `id`
     * const dailyLogWithIdOnly = await prisma.dailyLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyLogCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DailyLog.
     * @param {DailyLogDeleteArgs} args - Arguments to delete one DailyLog.
     * @example
     * // Delete one DailyLog
     * const DailyLog = await prisma.dailyLog.delete({
     *   where: {
     *     // ... filter to delete one DailyLog
     *   }
     * })
     * 
     */
    delete<T extends DailyLogDeleteArgs>(args: SelectSubset<T, DailyLogDeleteArgs<ExtArgs>>): Prisma__DailyLogClient<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DailyLog.
     * @param {DailyLogUpdateArgs} args - Arguments to update one DailyLog.
     * @example
     * // Update one DailyLog
     * const dailyLog = await prisma.dailyLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyLogUpdateArgs>(args: SelectSubset<T, DailyLogUpdateArgs<ExtArgs>>): Prisma__DailyLogClient<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DailyLogs.
     * @param {DailyLogDeleteManyArgs} args - Arguments to filter DailyLogs to delete.
     * @example
     * // Delete a few DailyLogs
     * const { count } = await prisma.dailyLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyLogDeleteManyArgs>(args?: SelectSubset<T, DailyLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyLogs
     * const dailyLog = await prisma.dailyLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyLogUpdateManyArgs>(args: SelectSubset<T, DailyLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyLogs and returns the data updated in the database.
     * @param {DailyLogUpdateManyAndReturnArgs} args - Arguments to update many DailyLogs.
     * @example
     * // Update many DailyLogs
     * const dailyLog = await prisma.dailyLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DailyLogs and only return the `id`
     * const dailyLogWithIdOnly = await prisma.dailyLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DailyLogUpdateManyAndReturnArgs>(args: SelectSubset<T, DailyLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DailyLog.
     * @param {DailyLogUpsertArgs} args - Arguments to update or create a DailyLog.
     * @example
     * // Update or create a DailyLog
     * const dailyLog = await prisma.dailyLog.upsert({
     *   create: {
     *     // ... data to create a DailyLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyLog we want to update
     *   }
     * })
     */
    upsert<T extends DailyLogUpsertArgs>(args: SelectSubset<T, DailyLogUpsertArgs<ExtArgs>>): Prisma__DailyLogClient<$Result.GetResult<Prisma.$DailyLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DailyLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyLogCountArgs} args - Arguments to filter DailyLogs to count.
     * @example
     * // Count the number of DailyLogs
     * const count = await prisma.dailyLog.count({
     *   where: {
     *     // ... the filter for the DailyLogs we want to count
     *   }
     * })
    **/
    count<T extends DailyLogCountArgs>(
      args?: Subset<T, DailyLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DailyLogAggregateArgs>(args: Subset<T, DailyLogAggregateArgs>): Prisma.PrismaPromise<GetDailyLogAggregateType<T>>

    /**
     * Group by DailyLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DailyLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyLogGroupByArgs['orderBy'] }
        : { orderBy?: DailyLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DailyLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyLog model
   */
  readonly fields: DailyLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DailyLog model
   */
  interface DailyLogFieldRefs {
    readonly id: FieldRef<"DailyLog", 'String'>
    readonly anonId: FieldRef<"DailyLog", 'String'>
    readonly date: FieldRef<"DailyLog", 'DateTime'>
    readonly mood: FieldRef<"DailyLog", 'String'>
    readonly symptoms: FieldRef<"DailyLog", 'String[]'>
    readonly encryptedNotes: FieldRef<"DailyLog", 'String'>
    readonly notesIv: FieldRef<"DailyLog", 'String'>
    readonly notesAuthTag: FieldRef<"DailyLog", 'String'>
    readonly createdAt: FieldRef<"DailyLog", 'DateTime'>
    readonly updatedAt: FieldRef<"DailyLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DailyLog findUnique
   */
  export type DailyLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyLog
     */
    omit?: DailyLogOmit<ExtArgs> | null
    /**
     * Filter, which DailyLog to fetch.
     */
    where: DailyLogWhereUniqueInput
  }

  /**
   * DailyLog findUniqueOrThrow
   */
  export type DailyLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyLog
     */
    omit?: DailyLogOmit<ExtArgs> | null
    /**
     * Filter, which DailyLog to fetch.
     */
    where: DailyLogWhereUniqueInput
  }

  /**
   * DailyLog findFirst
   */
  export type DailyLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyLog
     */
    omit?: DailyLogOmit<ExtArgs> | null
    /**
     * Filter, which DailyLog to fetch.
     */
    where?: DailyLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyLogs to fetch.
     */
    orderBy?: DailyLogOrderByWithRelationInput | DailyLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyLogs.
     */
    cursor?: DailyLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyLogs.
     */
    distinct?: DailyLogScalarFieldEnum | DailyLogScalarFieldEnum[]
  }

  /**
   * DailyLog findFirstOrThrow
   */
  export type DailyLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyLog
     */
    omit?: DailyLogOmit<ExtArgs> | null
    /**
     * Filter, which DailyLog to fetch.
     */
    where?: DailyLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyLogs to fetch.
     */
    orderBy?: DailyLogOrderByWithRelationInput | DailyLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyLogs.
     */
    cursor?: DailyLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyLogs.
     */
    distinct?: DailyLogScalarFieldEnum | DailyLogScalarFieldEnum[]
  }

  /**
   * DailyLog findMany
   */
  export type DailyLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyLog
     */
    omit?: DailyLogOmit<ExtArgs> | null
    /**
     * Filter, which DailyLogs to fetch.
     */
    where?: DailyLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyLogs to fetch.
     */
    orderBy?: DailyLogOrderByWithRelationInput | DailyLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyLogs.
     */
    cursor?: DailyLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyLogs.
     */
    skip?: number
    distinct?: DailyLogScalarFieldEnum | DailyLogScalarFieldEnum[]
  }

  /**
   * DailyLog create
   */
  export type DailyLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyLog
     */
    omit?: DailyLogOmit<ExtArgs> | null
    /**
     * The data needed to create a DailyLog.
     */
    data: XOR<DailyLogCreateInput, DailyLogUncheckedCreateInput>
  }

  /**
   * DailyLog createMany
   */
  export type DailyLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyLogs.
     */
    data: DailyLogCreateManyInput | DailyLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyLog createManyAndReturn
   */
  export type DailyLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyLog
     */
    omit?: DailyLogOmit<ExtArgs> | null
    /**
     * The data used to create many DailyLogs.
     */
    data: DailyLogCreateManyInput | DailyLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyLog update
   */
  export type DailyLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyLog
     */
    omit?: DailyLogOmit<ExtArgs> | null
    /**
     * The data needed to update a DailyLog.
     */
    data: XOR<DailyLogUpdateInput, DailyLogUncheckedUpdateInput>
    /**
     * Choose, which DailyLog to update.
     */
    where: DailyLogWhereUniqueInput
  }

  /**
   * DailyLog updateMany
   */
  export type DailyLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyLogs.
     */
    data: XOR<DailyLogUpdateManyMutationInput, DailyLogUncheckedUpdateManyInput>
    /**
     * Filter which DailyLogs to update
     */
    where?: DailyLogWhereInput
    /**
     * Limit how many DailyLogs to update.
     */
    limit?: number
  }

  /**
   * DailyLog updateManyAndReturn
   */
  export type DailyLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyLog
     */
    omit?: DailyLogOmit<ExtArgs> | null
    /**
     * The data used to update DailyLogs.
     */
    data: XOR<DailyLogUpdateManyMutationInput, DailyLogUncheckedUpdateManyInput>
    /**
     * Filter which DailyLogs to update
     */
    where?: DailyLogWhereInput
    /**
     * Limit how many DailyLogs to update.
     */
    limit?: number
  }

  /**
   * DailyLog upsert
   */
  export type DailyLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyLog
     */
    omit?: DailyLogOmit<ExtArgs> | null
    /**
     * The filter to search for the DailyLog to update in case it exists.
     */
    where: DailyLogWhereUniqueInput
    /**
     * In case the DailyLog found by the `where` argument doesn't exist, create a new DailyLog with this data.
     */
    create: XOR<DailyLogCreateInput, DailyLogUncheckedCreateInput>
    /**
     * In case the DailyLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyLogUpdateInput, DailyLogUncheckedUpdateInput>
  }

  /**
   * DailyLog delete
   */
  export type DailyLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyLog
     */
    omit?: DailyLogOmit<ExtArgs> | null
    /**
     * Filter which DailyLog to delete.
     */
    where: DailyLogWhereUniqueInput
  }

  /**
   * DailyLog deleteMany
   */
  export type DailyLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyLogs to delete
     */
    where?: DailyLogWhereInput
    /**
     * Limit how many DailyLogs to delete.
     */
    limit?: number
  }

  /**
   * DailyLog without action
   */
  export type DailyLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyLog
     */
    select?: DailyLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyLog
     */
    omit?: DailyLogOmit<ExtArgs> | null
  }


  /**
   * Model ForumPost
   */

  export type AggregateForumPost = {
    _count: ForumPostCountAggregateOutputType | null
    _avg: ForumPostAvgAggregateOutputType | null
    _sum: ForumPostSumAggregateOutputType | null
    _min: ForumPostMinAggregateOutputType | null
    _max: ForumPostMaxAggregateOutputType | null
  }

  export type ForumPostAvgAggregateOutputType = {
    reportsCount: number | null
    hugReactions: number | null
    meTooReactions: number | null
  }

  export type ForumPostSumAggregateOutputType = {
    reportsCount: number | null
    hugReactions: number | null
    meTooReactions: number | null
  }

  export type ForumPostMinAggregateOutputType = {
    id: string | null
    anonId: string | null
    title: string | null
    category: string | null
    content: string | null
    status: string | null
    reportsCount: number | null
    hugReactions: number | null
    meTooReactions: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ForumPostMaxAggregateOutputType = {
    id: string | null
    anonId: string | null
    title: string | null
    category: string | null
    content: string | null
    status: string | null
    reportsCount: number | null
    hugReactions: number | null
    meTooReactions: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ForumPostCountAggregateOutputType = {
    id: number
    anonId: number
    title: number
    category: number
    content: number
    status: number
    reportsCount: number
    hugReactions: number
    meTooReactions: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ForumPostAvgAggregateInputType = {
    reportsCount?: true
    hugReactions?: true
    meTooReactions?: true
  }

  export type ForumPostSumAggregateInputType = {
    reportsCount?: true
    hugReactions?: true
    meTooReactions?: true
  }

  export type ForumPostMinAggregateInputType = {
    id?: true
    anonId?: true
    title?: true
    category?: true
    content?: true
    status?: true
    reportsCount?: true
    hugReactions?: true
    meTooReactions?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ForumPostMaxAggregateInputType = {
    id?: true
    anonId?: true
    title?: true
    category?: true
    content?: true
    status?: true
    reportsCount?: true
    hugReactions?: true
    meTooReactions?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ForumPostCountAggregateInputType = {
    id?: true
    anonId?: true
    title?: true
    category?: true
    content?: true
    status?: true
    reportsCount?: true
    hugReactions?: true
    meTooReactions?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ForumPostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ForumPost to aggregate.
     */
    where?: ForumPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForumPosts to fetch.
     */
    orderBy?: ForumPostOrderByWithRelationInput | ForumPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ForumPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForumPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForumPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ForumPosts
    **/
    _count?: true | ForumPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ForumPostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ForumPostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ForumPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ForumPostMaxAggregateInputType
  }

  export type GetForumPostAggregateType<T extends ForumPostAggregateArgs> = {
        [P in keyof T & keyof AggregateForumPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateForumPost[P]>
      : GetScalarType<T[P], AggregateForumPost[P]>
  }




  export type ForumPostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ForumPostWhereInput
    orderBy?: ForumPostOrderByWithAggregationInput | ForumPostOrderByWithAggregationInput[]
    by: ForumPostScalarFieldEnum[] | ForumPostScalarFieldEnum
    having?: ForumPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ForumPostCountAggregateInputType | true
    _avg?: ForumPostAvgAggregateInputType
    _sum?: ForumPostSumAggregateInputType
    _min?: ForumPostMinAggregateInputType
    _max?: ForumPostMaxAggregateInputType
  }

  export type ForumPostGroupByOutputType = {
    id: string
    anonId: string
    title: string
    category: string
    content: string
    status: string
    reportsCount: number
    hugReactions: number
    meTooReactions: number
    createdAt: Date
    updatedAt: Date
    _count: ForumPostCountAggregateOutputType | null
    _avg: ForumPostAvgAggregateOutputType | null
    _sum: ForumPostSumAggregateOutputType | null
    _min: ForumPostMinAggregateOutputType | null
    _max: ForumPostMaxAggregateOutputType | null
  }

  type GetForumPostGroupByPayload<T extends ForumPostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ForumPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ForumPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ForumPostGroupByOutputType[P]>
            : GetScalarType<T[P], ForumPostGroupByOutputType[P]>
        }
      >
    >


  export type ForumPostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    anonId?: boolean
    title?: boolean
    category?: boolean
    content?: boolean
    status?: boolean
    reportsCount?: boolean
    hugReactions?: boolean
    meTooReactions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    comments?: boolean | ForumPost$commentsArgs<ExtArgs>
    reactions?: boolean | ForumPost$reactionsArgs<ExtArgs>
    _count?: boolean | ForumPostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["forumPost"]>

  export type ForumPostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    anonId?: boolean
    title?: boolean
    category?: boolean
    content?: boolean
    status?: boolean
    reportsCount?: boolean
    hugReactions?: boolean
    meTooReactions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["forumPost"]>

  export type ForumPostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    anonId?: boolean
    title?: boolean
    category?: boolean
    content?: boolean
    status?: boolean
    reportsCount?: boolean
    hugReactions?: boolean
    meTooReactions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["forumPost"]>

  export type ForumPostSelectScalar = {
    id?: boolean
    anonId?: boolean
    title?: boolean
    category?: boolean
    content?: boolean
    status?: boolean
    reportsCount?: boolean
    hugReactions?: boolean
    meTooReactions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ForumPostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "anonId" | "title" | "category" | "content" | "status" | "reportsCount" | "hugReactions" | "meTooReactions" | "createdAt" | "updatedAt", ExtArgs["result"]["forumPost"]>
  export type ForumPostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | ForumPost$commentsArgs<ExtArgs>
    reactions?: boolean | ForumPost$reactionsArgs<ExtArgs>
    _count?: boolean | ForumPostCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ForumPostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ForumPostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ForumPostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ForumPost"
    objects: {
      comments: Prisma.$ForumCommentPayload<ExtArgs>[]
      reactions: Prisma.$ForumReactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      anonId: string
      title: string
      category: string
      content: string
      status: string
      reportsCount: number
      hugReactions: number
      meTooReactions: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["forumPost"]>
    composites: {}
  }

  type ForumPostGetPayload<S extends boolean | null | undefined | ForumPostDefaultArgs> = $Result.GetResult<Prisma.$ForumPostPayload, S>

  type ForumPostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ForumPostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ForumPostCountAggregateInputType | true
    }

  export interface ForumPostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ForumPost'], meta: { name: 'ForumPost' } }
    /**
     * Find zero or one ForumPost that matches the filter.
     * @param {ForumPostFindUniqueArgs} args - Arguments to find a ForumPost
     * @example
     * // Get one ForumPost
     * const forumPost = await prisma.forumPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ForumPostFindUniqueArgs>(args: SelectSubset<T, ForumPostFindUniqueArgs<ExtArgs>>): Prisma__ForumPostClient<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ForumPost that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ForumPostFindUniqueOrThrowArgs} args - Arguments to find a ForumPost
     * @example
     * // Get one ForumPost
     * const forumPost = await prisma.forumPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ForumPostFindUniqueOrThrowArgs>(args: SelectSubset<T, ForumPostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ForumPostClient<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ForumPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumPostFindFirstArgs} args - Arguments to find a ForumPost
     * @example
     * // Get one ForumPost
     * const forumPost = await prisma.forumPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ForumPostFindFirstArgs>(args?: SelectSubset<T, ForumPostFindFirstArgs<ExtArgs>>): Prisma__ForumPostClient<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ForumPost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumPostFindFirstOrThrowArgs} args - Arguments to find a ForumPost
     * @example
     * // Get one ForumPost
     * const forumPost = await prisma.forumPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ForumPostFindFirstOrThrowArgs>(args?: SelectSubset<T, ForumPostFindFirstOrThrowArgs<ExtArgs>>): Prisma__ForumPostClient<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ForumPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumPostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ForumPosts
     * const forumPosts = await prisma.forumPost.findMany()
     * 
     * // Get first 10 ForumPosts
     * const forumPosts = await prisma.forumPost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const forumPostWithIdOnly = await prisma.forumPost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ForumPostFindManyArgs>(args?: SelectSubset<T, ForumPostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ForumPost.
     * @param {ForumPostCreateArgs} args - Arguments to create a ForumPost.
     * @example
     * // Create one ForumPost
     * const ForumPost = await prisma.forumPost.create({
     *   data: {
     *     // ... data to create a ForumPost
     *   }
     * })
     * 
     */
    create<T extends ForumPostCreateArgs>(args: SelectSubset<T, ForumPostCreateArgs<ExtArgs>>): Prisma__ForumPostClient<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ForumPosts.
     * @param {ForumPostCreateManyArgs} args - Arguments to create many ForumPosts.
     * @example
     * // Create many ForumPosts
     * const forumPost = await prisma.forumPost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ForumPostCreateManyArgs>(args?: SelectSubset<T, ForumPostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ForumPosts and returns the data saved in the database.
     * @param {ForumPostCreateManyAndReturnArgs} args - Arguments to create many ForumPosts.
     * @example
     * // Create many ForumPosts
     * const forumPost = await prisma.forumPost.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ForumPosts and only return the `id`
     * const forumPostWithIdOnly = await prisma.forumPost.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ForumPostCreateManyAndReturnArgs>(args?: SelectSubset<T, ForumPostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ForumPost.
     * @param {ForumPostDeleteArgs} args - Arguments to delete one ForumPost.
     * @example
     * // Delete one ForumPost
     * const ForumPost = await prisma.forumPost.delete({
     *   where: {
     *     // ... filter to delete one ForumPost
     *   }
     * })
     * 
     */
    delete<T extends ForumPostDeleteArgs>(args: SelectSubset<T, ForumPostDeleteArgs<ExtArgs>>): Prisma__ForumPostClient<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ForumPost.
     * @param {ForumPostUpdateArgs} args - Arguments to update one ForumPost.
     * @example
     * // Update one ForumPost
     * const forumPost = await prisma.forumPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ForumPostUpdateArgs>(args: SelectSubset<T, ForumPostUpdateArgs<ExtArgs>>): Prisma__ForumPostClient<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ForumPosts.
     * @param {ForumPostDeleteManyArgs} args - Arguments to filter ForumPosts to delete.
     * @example
     * // Delete a few ForumPosts
     * const { count } = await prisma.forumPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ForumPostDeleteManyArgs>(args?: SelectSubset<T, ForumPostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ForumPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ForumPosts
     * const forumPost = await prisma.forumPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ForumPostUpdateManyArgs>(args: SelectSubset<T, ForumPostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ForumPosts and returns the data updated in the database.
     * @param {ForumPostUpdateManyAndReturnArgs} args - Arguments to update many ForumPosts.
     * @example
     * // Update many ForumPosts
     * const forumPost = await prisma.forumPost.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ForumPosts and only return the `id`
     * const forumPostWithIdOnly = await prisma.forumPost.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ForumPostUpdateManyAndReturnArgs>(args: SelectSubset<T, ForumPostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ForumPost.
     * @param {ForumPostUpsertArgs} args - Arguments to update or create a ForumPost.
     * @example
     * // Update or create a ForumPost
     * const forumPost = await prisma.forumPost.upsert({
     *   create: {
     *     // ... data to create a ForumPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ForumPost we want to update
     *   }
     * })
     */
    upsert<T extends ForumPostUpsertArgs>(args: SelectSubset<T, ForumPostUpsertArgs<ExtArgs>>): Prisma__ForumPostClient<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ForumPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumPostCountArgs} args - Arguments to filter ForumPosts to count.
     * @example
     * // Count the number of ForumPosts
     * const count = await prisma.forumPost.count({
     *   where: {
     *     // ... the filter for the ForumPosts we want to count
     *   }
     * })
    **/
    count<T extends ForumPostCountArgs>(
      args?: Subset<T, ForumPostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ForumPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ForumPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ForumPostAggregateArgs>(args: Subset<T, ForumPostAggregateArgs>): Prisma.PrismaPromise<GetForumPostAggregateType<T>>

    /**
     * Group by ForumPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumPostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ForumPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ForumPostGroupByArgs['orderBy'] }
        : { orderBy?: ForumPostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ForumPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetForumPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ForumPost model
   */
  readonly fields: ForumPostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ForumPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ForumPostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    comments<T extends ForumPost$commentsArgs<ExtArgs> = {}>(args?: Subset<T, ForumPost$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reactions<T extends ForumPost$reactionsArgs<ExtArgs> = {}>(args?: Subset<T, ForumPost$reactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForumReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ForumPost model
   */
  interface ForumPostFieldRefs {
    readonly id: FieldRef<"ForumPost", 'String'>
    readonly anonId: FieldRef<"ForumPost", 'String'>
    readonly title: FieldRef<"ForumPost", 'String'>
    readonly category: FieldRef<"ForumPost", 'String'>
    readonly content: FieldRef<"ForumPost", 'String'>
    readonly status: FieldRef<"ForumPost", 'String'>
    readonly reportsCount: FieldRef<"ForumPost", 'Int'>
    readonly hugReactions: FieldRef<"ForumPost", 'Int'>
    readonly meTooReactions: FieldRef<"ForumPost", 'Int'>
    readonly createdAt: FieldRef<"ForumPost", 'DateTime'>
    readonly updatedAt: FieldRef<"ForumPost", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ForumPost findUnique
   */
  export type ForumPostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostInclude<ExtArgs> | null
    /**
     * Filter, which ForumPost to fetch.
     */
    where: ForumPostWhereUniqueInput
  }

  /**
   * ForumPost findUniqueOrThrow
   */
  export type ForumPostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostInclude<ExtArgs> | null
    /**
     * Filter, which ForumPost to fetch.
     */
    where: ForumPostWhereUniqueInput
  }

  /**
   * ForumPost findFirst
   */
  export type ForumPostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostInclude<ExtArgs> | null
    /**
     * Filter, which ForumPost to fetch.
     */
    where?: ForumPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForumPosts to fetch.
     */
    orderBy?: ForumPostOrderByWithRelationInput | ForumPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ForumPosts.
     */
    cursor?: ForumPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForumPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForumPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForumPosts.
     */
    distinct?: ForumPostScalarFieldEnum | ForumPostScalarFieldEnum[]
  }

  /**
   * ForumPost findFirstOrThrow
   */
  export type ForumPostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostInclude<ExtArgs> | null
    /**
     * Filter, which ForumPost to fetch.
     */
    where?: ForumPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForumPosts to fetch.
     */
    orderBy?: ForumPostOrderByWithRelationInput | ForumPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ForumPosts.
     */
    cursor?: ForumPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForumPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForumPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForumPosts.
     */
    distinct?: ForumPostScalarFieldEnum | ForumPostScalarFieldEnum[]
  }

  /**
   * ForumPost findMany
   */
  export type ForumPostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostInclude<ExtArgs> | null
    /**
     * Filter, which ForumPosts to fetch.
     */
    where?: ForumPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForumPosts to fetch.
     */
    orderBy?: ForumPostOrderByWithRelationInput | ForumPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ForumPosts.
     */
    cursor?: ForumPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForumPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForumPosts.
     */
    skip?: number
    distinct?: ForumPostScalarFieldEnum | ForumPostScalarFieldEnum[]
  }

  /**
   * ForumPost create
   */
  export type ForumPostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostInclude<ExtArgs> | null
    /**
     * The data needed to create a ForumPost.
     */
    data: XOR<ForumPostCreateInput, ForumPostUncheckedCreateInput>
  }

  /**
   * ForumPost createMany
   */
  export type ForumPostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ForumPosts.
     */
    data: ForumPostCreateManyInput | ForumPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ForumPost createManyAndReturn
   */
  export type ForumPostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * The data used to create many ForumPosts.
     */
    data: ForumPostCreateManyInput | ForumPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ForumPost update
   */
  export type ForumPostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostInclude<ExtArgs> | null
    /**
     * The data needed to update a ForumPost.
     */
    data: XOR<ForumPostUpdateInput, ForumPostUncheckedUpdateInput>
    /**
     * Choose, which ForumPost to update.
     */
    where: ForumPostWhereUniqueInput
  }

  /**
   * ForumPost updateMany
   */
  export type ForumPostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ForumPosts.
     */
    data: XOR<ForumPostUpdateManyMutationInput, ForumPostUncheckedUpdateManyInput>
    /**
     * Filter which ForumPosts to update
     */
    where?: ForumPostWhereInput
    /**
     * Limit how many ForumPosts to update.
     */
    limit?: number
  }

  /**
   * ForumPost updateManyAndReturn
   */
  export type ForumPostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * The data used to update ForumPosts.
     */
    data: XOR<ForumPostUpdateManyMutationInput, ForumPostUncheckedUpdateManyInput>
    /**
     * Filter which ForumPosts to update
     */
    where?: ForumPostWhereInput
    /**
     * Limit how many ForumPosts to update.
     */
    limit?: number
  }

  /**
   * ForumPost upsert
   */
  export type ForumPostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostInclude<ExtArgs> | null
    /**
     * The filter to search for the ForumPost to update in case it exists.
     */
    where: ForumPostWhereUniqueInput
    /**
     * In case the ForumPost found by the `where` argument doesn't exist, create a new ForumPost with this data.
     */
    create: XOR<ForumPostCreateInput, ForumPostUncheckedCreateInput>
    /**
     * In case the ForumPost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ForumPostUpdateInput, ForumPostUncheckedUpdateInput>
  }

  /**
   * ForumPost delete
   */
  export type ForumPostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostInclude<ExtArgs> | null
    /**
     * Filter which ForumPost to delete.
     */
    where: ForumPostWhereUniqueInput
  }

  /**
   * ForumPost deleteMany
   */
  export type ForumPostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ForumPosts to delete
     */
    where?: ForumPostWhereInput
    /**
     * Limit how many ForumPosts to delete.
     */
    limit?: number
  }

  /**
   * ForumPost.comments
   */
  export type ForumPost$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
    where?: ForumCommentWhereInput
    orderBy?: ForumCommentOrderByWithRelationInput | ForumCommentOrderByWithRelationInput[]
    cursor?: ForumCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ForumCommentScalarFieldEnum | ForumCommentScalarFieldEnum[]
  }

  /**
   * ForumPost.reactions
   */
  export type ForumPost$reactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumReaction
     */
    select?: ForumReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumReaction
     */
    omit?: ForumReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumReactionInclude<ExtArgs> | null
    where?: ForumReactionWhereInput
    orderBy?: ForumReactionOrderByWithRelationInput | ForumReactionOrderByWithRelationInput[]
    cursor?: ForumReactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ForumReactionScalarFieldEnum | ForumReactionScalarFieldEnum[]
  }

  /**
   * ForumPost without action
   */
  export type ForumPostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostInclude<ExtArgs> | null
  }


  /**
   * Model ForumComment
   */

  export type AggregateForumComment = {
    _count: ForumCommentCountAggregateOutputType | null
    _min: ForumCommentMinAggregateOutputType | null
    _max: ForumCommentMaxAggregateOutputType | null
  }

  export type ForumCommentMinAggregateOutputType = {
    id: string | null
    postId: string | null
    anonId: string | null
    content: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ForumCommentMaxAggregateOutputType = {
    id: string | null
    postId: string | null
    anonId: string | null
    content: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ForumCommentCountAggregateOutputType = {
    id: number
    postId: number
    anonId: number
    content: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ForumCommentMinAggregateInputType = {
    id?: true
    postId?: true
    anonId?: true
    content?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ForumCommentMaxAggregateInputType = {
    id?: true
    postId?: true
    anonId?: true
    content?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ForumCommentCountAggregateInputType = {
    id?: true
    postId?: true
    anonId?: true
    content?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ForumCommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ForumComment to aggregate.
     */
    where?: ForumCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForumComments to fetch.
     */
    orderBy?: ForumCommentOrderByWithRelationInput | ForumCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ForumCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForumComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForumComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ForumComments
    **/
    _count?: true | ForumCommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ForumCommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ForumCommentMaxAggregateInputType
  }

  export type GetForumCommentAggregateType<T extends ForumCommentAggregateArgs> = {
        [P in keyof T & keyof AggregateForumComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateForumComment[P]>
      : GetScalarType<T[P], AggregateForumComment[P]>
  }




  export type ForumCommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ForumCommentWhereInput
    orderBy?: ForumCommentOrderByWithAggregationInput | ForumCommentOrderByWithAggregationInput[]
    by: ForumCommentScalarFieldEnum[] | ForumCommentScalarFieldEnum
    having?: ForumCommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ForumCommentCountAggregateInputType | true
    _min?: ForumCommentMinAggregateInputType
    _max?: ForumCommentMaxAggregateInputType
  }

  export type ForumCommentGroupByOutputType = {
    id: string
    postId: string
    anonId: string
    content: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: ForumCommentCountAggregateOutputType | null
    _min: ForumCommentMinAggregateOutputType | null
    _max: ForumCommentMaxAggregateOutputType | null
  }

  type GetForumCommentGroupByPayload<T extends ForumCommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ForumCommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ForumCommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ForumCommentGroupByOutputType[P]>
            : GetScalarType<T[P], ForumCommentGroupByOutputType[P]>
        }
      >
    >


  export type ForumCommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    anonId?: boolean
    content?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    post?: boolean | ForumPostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["forumComment"]>

  export type ForumCommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    anonId?: boolean
    content?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    post?: boolean | ForumPostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["forumComment"]>

  export type ForumCommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    anonId?: boolean
    content?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    post?: boolean | ForumPostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["forumComment"]>

  export type ForumCommentSelectScalar = {
    id?: boolean
    postId?: boolean
    anonId?: boolean
    content?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ForumCommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "postId" | "anonId" | "content" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["forumComment"]>
  export type ForumCommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | ForumPostDefaultArgs<ExtArgs>
  }
  export type ForumCommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | ForumPostDefaultArgs<ExtArgs>
  }
  export type ForumCommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | ForumPostDefaultArgs<ExtArgs>
  }

  export type $ForumCommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ForumComment"
    objects: {
      post: Prisma.$ForumPostPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      postId: string
      anonId: string
      content: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["forumComment"]>
    composites: {}
  }

  type ForumCommentGetPayload<S extends boolean | null | undefined | ForumCommentDefaultArgs> = $Result.GetResult<Prisma.$ForumCommentPayload, S>

  type ForumCommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ForumCommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ForumCommentCountAggregateInputType | true
    }

  export interface ForumCommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ForumComment'], meta: { name: 'ForumComment' } }
    /**
     * Find zero or one ForumComment that matches the filter.
     * @param {ForumCommentFindUniqueArgs} args - Arguments to find a ForumComment
     * @example
     * // Get one ForumComment
     * const forumComment = await prisma.forumComment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ForumCommentFindUniqueArgs>(args: SelectSubset<T, ForumCommentFindUniqueArgs<ExtArgs>>): Prisma__ForumCommentClient<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ForumComment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ForumCommentFindUniqueOrThrowArgs} args - Arguments to find a ForumComment
     * @example
     * // Get one ForumComment
     * const forumComment = await prisma.forumComment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ForumCommentFindUniqueOrThrowArgs>(args: SelectSubset<T, ForumCommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ForumCommentClient<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ForumComment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumCommentFindFirstArgs} args - Arguments to find a ForumComment
     * @example
     * // Get one ForumComment
     * const forumComment = await prisma.forumComment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ForumCommentFindFirstArgs>(args?: SelectSubset<T, ForumCommentFindFirstArgs<ExtArgs>>): Prisma__ForumCommentClient<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ForumComment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumCommentFindFirstOrThrowArgs} args - Arguments to find a ForumComment
     * @example
     * // Get one ForumComment
     * const forumComment = await prisma.forumComment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ForumCommentFindFirstOrThrowArgs>(args?: SelectSubset<T, ForumCommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ForumCommentClient<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ForumComments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumCommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ForumComments
     * const forumComments = await prisma.forumComment.findMany()
     * 
     * // Get first 10 ForumComments
     * const forumComments = await prisma.forumComment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const forumCommentWithIdOnly = await prisma.forumComment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ForumCommentFindManyArgs>(args?: SelectSubset<T, ForumCommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ForumComment.
     * @param {ForumCommentCreateArgs} args - Arguments to create a ForumComment.
     * @example
     * // Create one ForumComment
     * const ForumComment = await prisma.forumComment.create({
     *   data: {
     *     // ... data to create a ForumComment
     *   }
     * })
     * 
     */
    create<T extends ForumCommentCreateArgs>(args: SelectSubset<T, ForumCommentCreateArgs<ExtArgs>>): Prisma__ForumCommentClient<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ForumComments.
     * @param {ForumCommentCreateManyArgs} args - Arguments to create many ForumComments.
     * @example
     * // Create many ForumComments
     * const forumComment = await prisma.forumComment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ForumCommentCreateManyArgs>(args?: SelectSubset<T, ForumCommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ForumComments and returns the data saved in the database.
     * @param {ForumCommentCreateManyAndReturnArgs} args - Arguments to create many ForumComments.
     * @example
     * // Create many ForumComments
     * const forumComment = await prisma.forumComment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ForumComments and only return the `id`
     * const forumCommentWithIdOnly = await prisma.forumComment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ForumCommentCreateManyAndReturnArgs>(args?: SelectSubset<T, ForumCommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ForumComment.
     * @param {ForumCommentDeleteArgs} args - Arguments to delete one ForumComment.
     * @example
     * // Delete one ForumComment
     * const ForumComment = await prisma.forumComment.delete({
     *   where: {
     *     // ... filter to delete one ForumComment
     *   }
     * })
     * 
     */
    delete<T extends ForumCommentDeleteArgs>(args: SelectSubset<T, ForumCommentDeleteArgs<ExtArgs>>): Prisma__ForumCommentClient<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ForumComment.
     * @param {ForumCommentUpdateArgs} args - Arguments to update one ForumComment.
     * @example
     * // Update one ForumComment
     * const forumComment = await prisma.forumComment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ForumCommentUpdateArgs>(args: SelectSubset<T, ForumCommentUpdateArgs<ExtArgs>>): Prisma__ForumCommentClient<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ForumComments.
     * @param {ForumCommentDeleteManyArgs} args - Arguments to filter ForumComments to delete.
     * @example
     * // Delete a few ForumComments
     * const { count } = await prisma.forumComment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ForumCommentDeleteManyArgs>(args?: SelectSubset<T, ForumCommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ForumComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumCommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ForumComments
     * const forumComment = await prisma.forumComment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ForumCommentUpdateManyArgs>(args: SelectSubset<T, ForumCommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ForumComments and returns the data updated in the database.
     * @param {ForumCommentUpdateManyAndReturnArgs} args - Arguments to update many ForumComments.
     * @example
     * // Update many ForumComments
     * const forumComment = await prisma.forumComment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ForumComments and only return the `id`
     * const forumCommentWithIdOnly = await prisma.forumComment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ForumCommentUpdateManyAndReturnArgs>(args: SelectSubset<T, ForumCommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ForumComment.
     * @param {ForumCommentUpsertArgs} args - Arguments to update or create a ForumComment.
     * @example
     * // Update or create a ForumComment
     * const forumComment = await prisma.forumComment.upsert({
     *   create: {
     *     // ... data to create a ForumComment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ForumComment we want to update
     *   }
     * })
     */
    upsert<T extends ForumCommentUpsertArgs>(args: SelectSubset<T, ForumCommentUpsertArgs<ExtArgs>>): Prisma__ForumCommentClient<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ForumComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumCommentCountArgs} args - Arguments to filter ForumComments to count.
     * @example
     * // Count the number of ForumComments
     * const count = await prisma.forumComment.count({
     *   where: {
     *     // ... the filter for the ForumComments we want to count
     *   }
     * })
    **/
    count<T extends ForumCommentCountArgs>(
      args?: Subset<T, ForumCommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ForumCommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ForumComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumCommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ForumCommentAggregateArgs>(args: Subset<T, ForumCommentAggregateArgs>): Prisma.PrismaPromise<GetForumCommentAggregateType<T>>

    /**
     * Group by ForumComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumCommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ForumCommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ForumCommentGroupByArgs['orderBy'] }
        : { orderBy?: ForumCommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ForumCommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetForumCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ForumComment model
   */
  readonly fields: ForumCommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ForumComment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ForumCommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends ForumPostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ForumPostDefaultArgs<ExtArgs>>): Prisma__ForumPostClient<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ForumComment model
   */
  interface ForumCommentFieldRefs {
    readonly id: FieldRef<"ForumComment", 'String'>
    readonly postId: FieldRef<"ForumComment", 'String'>
    readonly anonId: FieldRef<"ForumComment", 'String'>
    readonly content: FieldRef<"ForumComment", 'String'>
    readonly status: FieldRef<"ForumComment", 'String'>
    readonly createdAt: FieldRef<"ForumComment", 'DateTime'>
    readonly updatedAt: FieldRef<"ForumComment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ForumComment findUnique
   */
  export type ForumCommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
    /**
     * Filter, which ForumComment to fetch.
     */
    where: ForumCommentWhereUniqueInput
  }

  /**
   * ForumComment findUniqueOrThrow
   */
  export type ForumCommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
    /**
     * Filter, which ForumComment to fetch.
     */
    where: ForumCommentWhereUniqueInput
  }

  /**
   * ForumComment findFirst
   */
  export type ForumCommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
    /**
     * Filter, which ForumComment to fetch.
     */
    where?: ForumCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForumComments to fetch.
     */
    orderBy?: ForumCommentOrderByWithRelationInput | ForumCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ForumComments.
     */
    cursor?: ForumCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForumComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForumComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForumComments.
     */
    distinct?: ForumCommentScalarFieldEnum | ForumCommentScalarFieldEnum[]
  }

  /**
   * ForumComment findFirstOrThrow
   */
  export type ForumCommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
    /**
     * Filter, which ForumComment to fetch.
     */
    where?: ForumCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForumComments to fetch.
     */
    orderBy?: ForumCommentOrderByWithRelationInput | ForumCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ForumComments.
     */
    cursor?: ForumCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForumComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForumComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForumComments.
     */
    distinct?: ForumCommentScalarFieldEnum | ForumCommentScalarFieldEnum[]
  }

  /**
   * ForumComment findMany
   */
  export type ForumCommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
    /**
     * Filter, which ForumComments to fetch.
     */
    where?: ForumCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForumComments to fetch.
     */
    orderBy?: ForumCommentOrderByWithRelationInput | ForumCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ForumComments.
     */
    cursor?: ForumCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForumComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForumComments.
     */
    skip?: number
    distinct?: ForumCommentScalarFieldEnum | ForumCommentScalarFieldEnum[]
  }

  /**
   * ForumComment create
   */
  export type ForumCommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
    /**
     * The data needed to create a ForumComment.
     */
    data: XOR<ForumCommentCreateInput, ForumCommentUncheckedCreateInput>
  }

  /**
   * ForumComment createMany
   */
  export type ForumCommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ForumComments.
     */
    data: ForumCommentCreateManyInput | ForumCommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ForumComment createManyAndReturn
   */
  export type ForumCommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * The data used to create many ForumComments.
     */
    data: ForumCommentCreateManyInput | ForumCommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ForumComment update
   */
  export type ForumCommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
    /**
     * The data needed to update a ForumComment.
     */
    data: XOR<ForumCommentUpdateInput, ForumCommentUncheckedUpdateInput>
    /**
     * Choose, which ForumComment to update.
     */
    where: ForumCommentWhereUniqueInput
  }

  /**
   * ForumComment updateMany
   */
  export type ForumCommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ForumComments.
     */
    data: XOR<ForumCommentUpdateManyMutationInput, ForumCommentUncheckedUpdateManyInput>
    /**
     * Filter which ForumComments to update
     */
    where?: ForumCommentWhereInput
    /**
     * Limit how many ForumComments to update.
     */
    limit?: number
  }

  /**
   * ForumComment updateManyAndReturn
   */
  export type ForumCommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * The data used to update ForumComments.
     */
    data: XOR<ForumCommentUpdateManyMutationInput, ForumCommentUncheckedUpdateManyInput>
    /**
     * Filter which ForumComments to update
     */
    where?: ForumCommentWhereInput
    /**
     * Limit how many ForumComments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ForumComment upsert
   */
  export type ForumCommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
    /**
     * The filter to search for the ForumComment to update in case it exists.
     */
    where: ForumCommentWhereUniqueInput
    /**
     * In case the ForumComment found by the `where` argument doesn't exist, create a new ForumComment with this data.
     */
    create: XOR<ForumCommentCreateInput, ForumCommentUncheckedCreateInput>
    /**
     * In case the ForumComment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ForumCommentUpdateInput, ForumCommentUncheckedUpdateInput>
  }

  /**
   * ForumComment delete
   */
  export type ForumCommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
    /**
     * Filter which ForumComment to delete.
     */
    where: ForumCommentWhereUniqueInput
  }

  /**
   * ForumComment deleteMany
   */
  export type ForumCommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ForumComments to delete
     */
    where?: ForumCommentWhereInput
    /**
     * Limit how many ForumComments to delete.
     */
    limit?: number
  }

  /**
   * ForumComment without action
   */
  export type ForumCommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
  }


  /**
   * Model ForumReaction
   */

  export type AggregateForumReaction = {
    _count: ForumReactionCountAggregateOutputType | null
    _min: ForumReactionMinAggregateOutputType | null
    _max: ForumReactionMaxAggregateOutputType | null
  }

  export type ForumReactionMinAggregateOutputType = {
    id: string | null
    postId: string | null
    anonId: string | null
    reactionType: string | null
    createdAt: Date | null
  }

  export type ForumReactionMaxAggregateOutputType = {
    id: string | null
    postId: string | null
    anonId: string | null
    reactionType: string | null
    createdAt: Date | null
  }

  export type ForumReactionCountAggregateOutputType = {
    id: number
    postId: number
    anonId: number
    reactionType: number
    createdAt: number
    _all: number
  }


  export type ForumReactionMinAggregateInputType = {
    id?: true
    postId?: true
    anonId?: true
    reactionType?: true
    createdAt?: true
  }

  export type ForumReactionMaxAggregateInputType = {
    id?: true
    postId?: true
    anonId?: true
    reactionType?: true
    createdAt?: true
  }

  export type ForumReactionCountAggregateInputType = {
    id?: true
    postId?: true
    anonId?: true
    reactionType?: true
    createdAt?: true
    _all?: true
  }

  export type ForumReactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ForumReaction to aggregate.
     */
    where?: ForumReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForumReactions to fetch.
     */
    orderBy?: ForumReactionOrderByWithRelationInput | ForumReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ForumReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForumReactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForumReactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ForumReactions
    **/
    _count?: true | ForumReactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ForumReactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ForumReactionMaxAggregateInputType
  }

  export type GetForumReactionAggregateType<T extends ForumReactionAggregateArgs> = {
        [P in keyof T & keyof AggregateForumReaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateForumReaction[P]>
      : GetScalarType<T[P], AggregateForumReaction[P]>
  }




  export type ForumReactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ForumReactionWhereInput
    orderBy?: ForumReactionOrderByWithAggregationInput | ForumReactionOrderByWithAggregationInput[]
    by: ForumReactionScalarFieldEnum[] | ForumReactionScalarFieldEnum
    having?: ForumReactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ForumReactionCountAggregateInputType | true
    _min?: ForumReactionMinAggregateInputType
    _max?: ForumReactionMaxAggregateInputType
  }

  export type ForumReactionGroupByOutputType = {
    id: string
    postId: string
    anonId: string
    reactionType: string
    createdAt: Date
    _count: ForumReactionCountAggregateOutputType | null
    _min: ForumReactionMinAggregateOutputType | null
    _max: ForumReactionMaxAggregateOutputType | null
  }

  type GetForumReactionGroupByPayload<T extends ForumReactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ForumReactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ForumReactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ForumReactionGroupByOutputType[P]>
            : GetScalarType<T[P], ForumReactionGroupByOutputType[P]>
        }
      >
    >


  export type ForumReactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    anonId?: boolean
    reactionType?: boolean
    createdAt?: boolean
    post?: boolean | ForumPostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["forumReaction"]>

  export type ForumReactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    anonId?: boolean
    reactionType?: boolean
    createdAt?: boolean
    post?: boolean | ForumPostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["forumReaction"]>

  export type ForumReactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    anonId?: boolean
    reactionType?: boolean
    createdAt?: boolean
    post?: boolean | ForumPostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["forumReaction"]>

  export type ForumReactionSelectScalar = {
    id?: boolean
    postId?: boolean
    anonId?: boolean
    reactionType?: boolean
    createdAt?: boolean
  }

  export type ForumReactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "postId" | "anonId" | "reactionType" | "createdAt", ExtArgs["result"]["forumReaction"]>
  export type ForumReactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | ForumPostDefaultArgs<ExtArgs>
  }
  export type ForumReactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | ForumPostDefaultArgs<ExtArgs>
  }
  export type ForumReactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | ForumPostDefaultArgs<ExtArgs>
  }

  export type $ForumReactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ForumReaction"
    objects: {
      post: Prisma.$ForumPostPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      postId: string
      anonId: string
      reactionType: string
      createdAt: Date
    }, ExtArgs["result"]["forumReaction"]>
    composites: {}
  }

  type ForumReactionGetPayload<S extends boolean | null | undefined | ForumReactionDefaultArgs> = $Result.GetResult<Prisma.$ForumReactionPayload, S>

  type ForumReactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ForumReactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ForumReactionCountAggregateInputType | true
    }

  export interface ForumReactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ForumReaction'], meta: { name: 'ForumReaction' } }
    /**
     * Find zero or one ForumReaction that matches the filter.
     * @param {ForumReactionFindUniqueArgs} args - Arguments to find a ForumReaction
     * @example
     * // Get one ForumReaction
     * const forumReaction = await prisma.forumReaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ForumReactionFindUniqueArgs>(args: SelectSubset<T, ForumReactionFindUniqueArgs<ExtArgs>>): Prisma__ForumReactionClient<$Result.GetResult<Prisma.$ForumReactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ForumReaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ForumReactionFindUniqueOrThrowArgs} args - Arguments to find a ForumReaction
     * @example
     * // Get one ForumReaction
     * const forumReaction = await prisma.forumReaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ForumReactionFindUniqueOrThrowArgs>(args: SelectSubset<T, ForumReactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ForumReactionClient<$Result.GetResult<Prisma.$ForumReactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ForumReaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumReactionFindFirstArgs} args - Arguments to find a ForumReaction
     * @example
     * // Get one ForumReaction
     * const forumReaction = await prisma.forumReaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ForumReactionFindFirstArgs>(args?: SelectSubset<T, ForumReactionFindFirstArgs<ExtArgs>>): Prisma__ForumReactionClient<$Result.GetResult<Prisma.$ForumReactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ForumReaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumReactionFindFirstOrThrowArgs} args - Arguments to find a ForumReaction
     * @example
     * // Get one ForumReaction
     * const forumReaction = await prisma.forumReaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ForumReactionFindFirstOrThrowArgs>(args?: SelectSubset<T, ForumReactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ForumReactionClient<$Result.GetResult<Prisma.$ForumReactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ForumReactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumReactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ForumReactions
     * const forumReactions = await prisma.forumReaction.findMany()
     * 
     * // Get first 10 ForumReactions
     * const forumReactions = await prisma.forumReaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const forumReactionWithIdOnly = await prisma.forumReaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ForumReactionFindManyArgs>(args?: SelectSubset<T, ForumReactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForumReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ForumReaction.
     * @param {ForumReactionCreateArgs} args - Arguments to create a ForumReaction.
     * @example
     * // Create one ForumReaction
     * const ForumReaction = await prisma.forumReaction.create({
     *   data: {
     *     // ... data to create a ForumReaction
     *   }
     * })
     * 
     */
    create<T extends ForumReactionCreateArgs>(args: SelectSubset<T, ForumReactionCreateArgs<ExtArgs>>): Prisma__ForumReactionClient<$Result.GetResult<Prisma.$ForumReactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ForumReactions.
     * @param {ForumReactionCreateManyArgs} args - Arguments to create many ForumReactions.
     * @example
     * // Create many ForumReactions
     * const forumReaction = await prisma.forumReaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ForumReactionCreateManyArgs>(args?: SelectSubset<T, ForumReactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ForumReactions and returns the data saved in the database.
     * @param {ForumReactionCreateManyAndReturnArgs} args - Arguments to create many ForumReactions.
     * @example
     * // Create many ForumReactions
     * const forumReaction = await prisma.forumReaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ForumReactions and only return the `id`
     * const forumReactionWithIdOnly = await prisma.forumReaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ForumReactionCreateManyAndReturnArgs>(args?: SelectSubset<T, ForumReactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForumReactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ForumReaction.
     * @param {ForumReactionDeleteArgs} args - Arguments to delete one ForumReaction.
     * @example
     * // Delete one ForumReaction
     * const ForumReaction = await prisma.forumReaction.delete({
     *   where: {
     *     // ... filter to delete one ForumReaction
     *   }
     * })
     * 
     */
    delete<T extends ForumReactionDeleteArgs>(args: SelectSubset<T, ForumReactionDeleteArgs<ExtArgs>>): Prisma__ForumReactionClient<$Result.GetResult<Prisma.$ForumReactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ForumReaction.
     * @param {ForumReactionUpdateArgs} args - Arguments to update one ForumReaction.
     * @example
     * // Update one ForumReaction
     * const forumReaction = await prisma.forumReaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ForumReactionUpdateArgs>(args: SelectSubset<T, ForumReactionUpdateArgs<ExtArgs>>): Prisma__ForumReactionClient<$Result.GetResult<Prisma.$ForumReactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ForumReactions.
     * @param {ForumReactionDeleteManyArgs} args - Arguments to filter ForumReactions to delete.
     * @example
     * // Delete a few ForumReactions
     * const { count } = await prisma.forumReaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ForumReactionDeleteManyArgs>(args?: SelectSubset<T, ForumReactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ForumReactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumReactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ForumReactions
     * const forumReaction = await prisma.forumReaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ForumReactionUpdateManyArgs>(args: SelectSubset<T, ForumReactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ForumReactions and returns the data updated in the database.
     * @param {ForumReactionUpdateManyAndReturnArgs} args - Arguments to update many ForumReactions.
     * @example
     * // Update many ForumReactions
     * const forumReaction = await prisma.forumReaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ForumReactions and only return the `id`
     * const forumReactionWithIdOnly = await prisma.forumReaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ForumReactionUpdateManyAndReturnArgs>(args: SelectSubset<T, ForumReactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForumReactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ForumReaction.
     * @param {ForumReactionUpsertArgs} args - Arguments to update or create a ForumReaction.
     * @example
     * // Update or create a ForumReaction
     * const forumReaction = await prisma.forumReaction.upsert({
     *   create: {
     *     // ... data to create a ForumReaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ForumReaction we want to update
     *   }
     * })
     */
    upsert<T extends ForumReactionUpsertArgs>(args: SelectSubset<T, ForumReactionUpsertArgs<ExtArgs>>): Prisma__ForumReactionClient<$Result.GetResult<Prisma.$ForumReactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ForumReactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumReactionCountArgs} args - Arguments to filter ForumReactions to count.
     * @example
     * // Count the number of ForumReactions
     * const count = await prisma.forumReaction.count({
     *   where: {
     *     // ... the filter for the ForumReactions we want to count
     *   }
     * })
    **/
    count<T extends ForumReactionCountArgs>(
      args?: Subset<T, ForumReactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ForumReactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ForumReaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumReactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ForumReactionAggregateArgs>(args: Subset<T, ForumReactionAggregateArgs>): Prisma.PrismaPromise<GetForumReactionAggregateType<T>>

    /**
     * Group by ForumReaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumReactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ForumReactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ForumReactionGroupByArgs['orderBy'] }
        : { orderBy?: ForumReactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ForumReactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetForumReactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ForumReaction model
   */
  readonly fields: ForumReactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ForumReaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ForumReactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends ForumPostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ForumPostDefaultArgs<ExtArgs>>): Prisma__ForumPostClient<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ForumReaction model
   */
  interface ForumReactionFieldRefs {
    readonly id: FieldRef<"ForumReaction", 'String'>
    readonly postId: FieldRef<"ForumReaction", 'String'>
    readonly anonId: FieldRef<"ForumReaction", 'String'>
    readonly reactionType: FieldRef<"ForumReaction", 'String'>
    readonly createdAt: FieldRef<"ForumReaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ForumReaction findUnique
   */
  export type ForumReactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumReaction
     */
    select?: ForumReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumReaction
     */
    omit?: ForumReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumReactionInclude<ExtArgs> | null
    /**
     * Filter, which ForumReaction to fetch.
     */
    where: ForumReactionWhereUniqueInput
  }

  /**
   * ForumReaction findUniqueOrThrow
   */
  export type ForumReactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumReaction
     */
    select?: ForumReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumReaction
     */
    omit?: ForumReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumReactionInclude<ExtArgs> | null
    /**
     * Filter, which ForumReaction to fetch.
     */
    where: ForumReactionWhereUniqueInput
  }

  /**
   * ForumReaction findFirst
   */
  export type ForumReactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumReaction
     */
    select?: ForumReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumReaction
     */
    omit?: ForumReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumReactionInclude<ExtArgs> | null
    /**
     * Filter, which ForumReaction to fetch.
     */
    where?: ForumReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForumReactions to fetch.
     */
    orderBy?: ForumReactionOrderByWithRelationInput | ForumReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ForumReactions.
     */
    cursor?: ForumReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForumReactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForumReactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForumReactions.
     */
    distinct?: ForumReactionScalarFieldEnum | ForumReactionScalarFieldEnum[]
  }

  /**
   * ForumReaction findFirstOrThrow
   */
  export type ForumReactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumReaction
     */
    select?: ForumReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumReaction
     */
    omit?: ForumReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumReactionInclude<ExtArgs> | null
    /**
     * Filter, which ForumReaction to fetch.
     */
    where?: ForumReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForumReactions to fetch.
     */
    orderBy?: ForumReactionOrderByWithRelationInput | ForumReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ForumReactions.
     */
    cursor?: ForumReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForumReactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForumReactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForumReactions.
     */
    distinct?: ForumReactionScalarFieldEnum | ForumReactionScalarFieldEnum[]
  }

  /**
   * ForumReaction findMany
   */
  export type ForumReactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumReaction
     */
    select?: ForumReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumReaction
     */
    omit?: ForumReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumReactionInclude<ExtArgs> | null
    /**
     * Filter, which ForumReactions to fetch.
     */
    where?: ForumReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForumReactions to fetch.
     */
    orderBy?: ForumReactionOrderByWithRelationInput | ForumReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ForumReactions.
     */
    cursor?: ForumReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForumReactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForumReactions.
     */
    skip?: number
    distinct?: ForumReactionScalarFieldEnum | ForumReactionScalarFieldEnum[]
  }

  /**
   * ForumReaction create
   */
  export type ForumReactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumReaction
     */
    select?: ForumReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumReaction
     */
    omit?: ForumReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumReactionInclude<ExtArgs> | null
    /**
     * The data needed to create a ForumReaction.
     */
    data: XOR<ForumReactionCreateInput, ForumReactionUncheckedCreateInput>
  }

  /**
   * ForumReaction createMany
   */
  export type ForumReactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ForumReactions.
     */
    data: ForumReactionCreateManyInput | ForumReactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ForumReaction createManyAndReturn
   */
  export type ForumReactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumReaction
     */
    select?: ForumReactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ForumReaction
     */
    omit?: ForumReactionOmit<ExtArgs> | null
    /**
     * The data used to create many ForumReactions.
     */
    data: ForumReactionCreateManyInput | ForumReactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumReactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ForumReaction update
   */
  export type ForumReactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumReaction
     */
    select?: ForumReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumReaction
     */
    omit?: ForumReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumReactionInclude<ExtArgs> | null
    /**
     * The data needed to update a ForumReaction.
     */
    data: XOR<ForumReactionUpdateInput, ForumReactionUncheckedUpdateInput>
    /**
     * Choose, which ForumReaction to update.
     */
    where: ForumReactionWhereUniqueInput
  }

  /**
   * ForumReaction updateMany
   */
  export type ForumReactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ForumReactions.
     */
    data: XOR<ForumReactionUpdateManyMutationInput, ForumReactionUncheckedUpdateManyInput>
    /**
     * Filter which ForumReactions to update
     */
    where?: ForumReactionWhereInput
    /**
     * Limit how many ForumReactions to update.
     */
    limit?: number
  }

  /**
   * ForumReaction updateManyAndReturn
   */
  export type ForumReactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumReaction
     */
    select?: ForumReactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ForumReaction
     */
    omit?: ForumReactionOmit<ExtArgs> | null
    /**
     * The data used to update ForumReactions.
     */
    data: XOR<ForumReactionUpdateManyMutationInput, ForumReactionUncheckedUpdateManyInput>
    /**
     * Filter which ForumReactions to update
     */
    where?: ForumReactionWhereInput
    /**
     * Limit how many ForumReactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumReactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ForumReaction upsert
   */
  export type ForumReactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumReaction
     */
    select?: ForumReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumReaction
     */
    omit?: ForumReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumReactionInclude<ExtArgs> | null
    /**
     * The filter to search for the ForumReaction to update in case it exists.
     */
    where: ForumReactionWhereUniqueInput
    /**
     * In case the ForumReaction found by the `where` argument doesn't exist, create a new ForumReaction with this data.
     */
    create: XOR<ForumReactionCreateInput, ForumReactionUncheckedCreateInput>
    /**
     * In case the ForumReaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ForumReactionUpdateInput, ForumReactionUncheckedUpdateInput>
  }

  /**
   * ForumReaction delete
   */
  export type ForumReactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumReaction
     */
    select?: ForumReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumReaction
     */
    omit?: ForumReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumReactionInclude<ExtArgs> | null
    /**
     * Filter which ForumReaction to delete.
     */
    where: ForumReactionWhereUniqueInput
  }

  /**
   * ForumReaction deleteMany
   */
  export type ForumReactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ForumReactions to delete
     */
    where?: ForumReactionWhereInput
    /**
     * Limit how many ForumReactions to delete.
     */
    limit?: number
  }

  /**
   * ForumReaction without action
   */
  export type ForumReactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumReaction
     */
    select?: ForumReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumReaction
     */
    omit?: ForumReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumReactionInclude<ExtArgs> | null
  }


  /**
   * Model AssistantMessage
   */

  export type AggregateAssistantMessage = {
    _count: AssistantMessageCountAggregateOutputType | null
    _min: AssistantMessageMinAggregateOutputType | null
    _max: AssistantMessageMaxAggregateOutputType | null
  }

  export type AssistantMessageMinAggregateOutputType = {
    id: string | null
    anonId: string | null
    role: string | null
    encryptedContent: string | null
    iv: string | null
    authTag: string | null
    isCrisis: boolean | null
    createdAt: Date | null
  }

  export type AssistantMessageMaxAggregateOutputType = {
    id: string | null
    anonId: string | null
    role: string | null
    encryptedContent: string | null
    iv: string | null
    authTag: string | null
    isCrisis: boolean | null
    createdAt: Date | null
  }

  export type AssistantMessageCountAggregateOutputType = {
    id: number
    anonId: number
    role: number
    encryptedContent: number
    iv: number
    authTag: number
    isCrisis: number
    createdAt: number
    _all: number
  }


  export type AssistantMessageMinAggregateInputType = {
    id?: true
    anonId?: true
    role?: true
    encryptedContent?: true
    iv?: true
    authTag?: true
    isCrisis?: true
    createdAt?: true
  }

  export type AssistantMessageMaxAggregateInputType = {
    id?: true
    anonId?: true
    role?: true
    encryptedContent?: true
    iv?: true
    authTag?: true
    isCrisis?: true
    createdAt?: true
  }

  export type AssistantMessageCountAggregateInputType = {
    id?: true
    anonId?: true
    role?: true
    encryptedContent?: true
    iv?: true
    authTag?: true
    isCrisis?: true
    createdAt?: true
    _all?: true
  }

  export type AssistantMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssistantMessage to aggregate.
     */
    where?: AssistantMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssistantMessages to fetch.
     */
    orderBy?: AssistantMessageOrderByWithRelationInput | AssistantMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssistantMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssistantMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssistantMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AssistantMessages
    **/
    _count?: true | AssistantMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssistantMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssistantMessageMaxAggregateInputType
  }

  export type GetAssistantMessageAggregateType<T extends AssistantMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateAssistantMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssistantMessage[P]>
      : GetScalarType<T[P], AggregateAssistantMessage[P]>
  }




  export type AssistantMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssistantMessageWhereInput
    orderBy?: AssistantMessageOrderByWithAggregationInput | AssistantMessageOrderByWithAggregationInput[]
    by: AssistantMessageScalarFieldEnum[] | AssistantMessageScalarFieldEnum
    having?: AssistantMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssistantMessageCountAggregateInputType | true
    _min?: AssistantMessageMinAggregateInputType
    _max?: AssistantMessageMaxAggregateInputType
  }

  export type AssistantMessageGroupByOutputType = {
    id: string
    anonId: string
    role: string
    encryptedContent: string
    iv: string
    authTag: string
    isCrisis: boolean
    createdAt: Date
    _count: AssistantMessageCountAggregateOutputType | null
    _min: AssistantMessageMinAggregateOutputType | null
    _max: AssistantMessageMaxAggregateOutputType | null
  }

  type GetAssistantMessageGroupByPayload<T extends AssistantMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssistantMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssistantMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssistantMessageGroupByOutputType[P]>
            : GetScalarType<T[P], AssistantMessageGroupByOutputType[P]>
        }
      >
    >


  export type AssistantMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    anonId?: boolean
    role?: boolean
    encryptedContent?: boolean
    iv?: boolean
    authTag?: boolean
    isCrisis?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["assistantMessage"]>

  export type AssistantMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    anonId?: boolean
    role?: boolean
    encryptedContent?: boolean
    iv?: boolean
    authTag?: boolean
    isCrisis?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["assistantMessage"]>

  export type AssistantMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    anonId?: boolean
    role?: boolean
    encryptedContent?: boolean
    iv?: boolean
    authTag?: boolean
    isCrisis?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["assistantMessage"]>

  export type AssistantMessageSelectScalar = {
    id?: boolean
    anonId?: boolean
    role?: boolean
    encryptedContent?: boolean
    iv?: boolean
    authTag?: boolean
    isCrisis?: boolean
    createdAt?: boolean
  }

  export type AssistantMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "anonId" | "role" | "encryptedContent" | "iv" | "authTag" | "isCrisis" | "createdAt", ExtArgs["result"]["assistantMessage"]>

  export type $AssistantMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AssistantMessage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      anonId: string
      role: string
      encryptedContent: string
      iv: string
      authTag: string
      isCrisis: boolean
      createdAt: Date
    }, ExtArgs["result"]["assistantMessage"]>
    composites: {}
  }

  type AssistantMessageGetPayload<S extends boolean | null | undefined | AssistantMessageDefaultArgs> = $Result.GetResult<Prisma.$AssistantMessagePayload, S>

  type AssistantMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssistantMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssistantMessageCountAggregateInputType | true
    }

  export interface AssistantMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AssistantMessage'], meta: { name: 'AssistantMessage' } }
    /**
     * Find zero or one AssistantMessage that matches the filter.
     * @param {AssistantMessageFindUniqueArgs} args - Arguments to find a AssistantMessage
     * @example
     * // Get one AssistantMessage
     * const assistantMessage = await prisma.assistantMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssistantMessageFindUniqueArgs>(args: SelectSubset<T, AssistantMessageFindUniqueArgs<ExtArgs>>): Prisma__AssistantMessageClient<$Result.GetResult<Prisma.$AssistantMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AssistantMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssistantMessageFindUniqueOrThrowArgs} args - Arguments to find a AssistantMessage
     * @example
     * // Get one AssistantMessage
     * const assistantMessage = await prisma.assistantMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssistantMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, AssistantMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssistantMessageClient<$Result.GetResult<Prisma.$AssistantMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssistantMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantMessageFindFirstArgs} args - Arguments to find a AssistantMessage
     * @example
     * // Get one AssistantMessage
     * const assistantMessage = await prisma.assistantMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssistantMessageFindFirstArgs>(args?: SelectSubset<T, AssistantMessageFindFirstArgs<ExtArgs>>): Prisma__AssistantMessageClient<$Result.GetResult<Prisma.$AssistantMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssistantMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantMessageFindFirstOrThrowArgs} args - Arguments to find a AssistantMessage
     * @example
     * // Get one AssistantMessage
     * const assistantMessage = await prisma.assistantMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssistantMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, AssistantMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssistantMessageClient<$Result.GetResult<Prisma.$AssistantMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AssistantMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AssistantMessages
     * const assistantMessages = await prisma.assistantMessage.findMany()
     * 
     * // Get first 10 AssistantMessages
     * const assistantMessages = await prisma.assistantMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assistantMessageWithIdOnly = await prisma.assistantMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssistantMessageFindManyArgs>(args?: SelectSubset<T, AssistantMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssistantMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AssistantMessage.
     * @param {AssistantMessageCreateArgs} args - Arguments to create a AssistantMessage.
     * @example
     * // Create one AssistantMessage
     * const AssistantMessage = await prisma.assistantMessage.create({
     *   data: {
     *     // ... data to create a AssistantMessage
     *   }
     * })
     * 
     */
    create<T extends AssistantMessageCreateArgs>(args: SelectSubset<T, AssistantMessageCreateArgs<ExtArgs>>): Prisma__AssistantMessageClient<$Result.GetResult<Prisma.$AssistantMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AssistantMessages.
     * @param {AssistantMessageCreateManyArgs} args - Arguments to create many AssistantMessages.
     * @example
     * // Create many AssistantMessages
     * const assistantMessage = await prisma.assistantMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssistantMessageCreateManyArgs>(args?: SelectSubset<T, AssistantMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AssistantMessages and returns the data saved in the database.
     * @param {AssistantMessageCreateManyAndReturnArgs} args - Arguments to create many AssistantMessages.
     * @example
     * // Create many AssistantMessages
     * const assistantMessage = await prisma.assistantMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AssistantMessages and only return the `id`
     * const assistantMessageWithIdOnly = await prisma.assistantMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssistantMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, AssistantMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssistantMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AssistantMessage.
     * @param {AssistantMessageDeleteArgs} args - Arguments to delete one AssistantMessage.
     * @example
     * // Delete one AssistantMessage
     * const AssistantMessage = await prisma.assistantMessage.delete({
     *   where: {
     *     // ... filter to delete one AssistantMessage
     *   }
     * })
     * 
     */
    delete<T extends AssistantMessageDeleteArgs>(args: SelectSubset<T, AssistantMessageDeleteArgs<ExtArgs>>): Prisma__AssistantMessageClient<$Result.GetResult<Prisma.$AssistantMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AssistantMessage.
     * @param {AssistantMessageUpdateArgs} args - Arguments to update one AssistantMessage.
     * @example
     * // Update one AssistantMessage
     * const assistantMessage = await prisma.assistantMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssistantMessageUpdateArgs>(args: SelectSubset<T, AssistantMessageUpdateArgs<ExtArgs>>): Prisma__AssistantMessageClient<$Result.GetResult<Prisma.$AssistantMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AssistantMessages.
     * @param {AssistantMessageDeleteManyArgs} args - Arguments to filter AssistantMessages to delete.
     * @example
     * // Delete a few AssistantMessages
     * const { count } = await prisma.assistantMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssistantMessageDeleteManyArgs>(args?: SelectSubset<T, AssistantMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssistantMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AssistantMessages
     * const assistantMessage = await prisma.assistantMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssistantMessageUpdateManyArgs>(args: SelectSubset<T, AssistantMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssistantMessages and returns the data updated in the database.
     * @param {AssistantMessageUpdateManyAndReturnArgs} args - Arguments to update many AssistantMessages.
     * @example
     * // Update many AssistantMessages
     * const assistantMessage = await prisma.assistantMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AssistantMessages and only return the `id`
     * const assistantMessageWithIdOnly = await prisma.assistantMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AssistantMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, AssistantMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssistantMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AssistantMessage.
     * @param {AssistantMessageUpsertArgs} args - Arguments to update or create a AssistantMessage.
     * @example
     * // Update or create a AssistantMessage
     * const assistantMessage = await prisma.assistantMessage.upsert({
     *   create: {
     *     // ... data to create a AssistantMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AssistantMessage we want to update
     *   }
     * })
     */
    upsert<T extends AssistantMessageUpsertArgs>(args: SelectSubset<T, AssistantMessageUpsertArgs<ExtArgs>>): Prisma__AssistantMessageClient<$Result.GetResult<Prisma.$AssistantMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AssistantMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantMessageCountArgs} args - Arguments to filter AssistantMessages to count.
     * @example
     * // Count the number of AssistantMessages
     * const count = await prisma.assistantMessage.count({
     *   where: {
     *     // ... the filter for the AssistantMessages we want to count
     *   }
     * })
    **/
    count<T extends AssistantMessageCountArgs>(
      args?: Subset<T, AssistantMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssistantMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AssistantMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssistantMessageAggregateArgs>(args: Subset<T, AssistantMessageAggregateArgs>): Prisma.PrismaPromise<GetAssistantMessageAggregateType<T>>

    /**
     * Group by AssistantMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistantMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssistantMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssistantMessageGroupByArgs['orderBy'] }
        : { orderBy?: AssistantMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssistantMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssistantMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AssistantMessage model
   */
  readonly fields: AssistantMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AssistantMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssistantMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AssistantMessage model
   */
  interface AssistantMessageFieldRefs {
    readonly id: FieldRef<"AssistantMessage", 'String'>
    readonly anonId: FieldRef<"AssistantMessage", 'String'>
    readonly role: FieldRef<"AssistantMessage", 'String'>
    readonly encryptedContent: FieldRef<"AssistantMessage", 'String'>
    readonly iv: FieldRef<"AssistantMessage", 'String'>
    readonly authTag: FieldRef<"AssistantMessage", 'String'>
    readonly isCrisis: FieldRef<"AssistantMessage", 'Boolean'>
    readonly createdAt: FieldRef<"AssistantMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AssistantMessage findUnique
   */
  export type AssistantMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantMessage
     */
    select?: AssistantMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssistantMessage
     */
    omit?: AssistantMessageOmit<ExtArgs> | null
    /**
     * Filter, which AssistantMessage to fetch.
     */
    where: AssistantMessageWhereUniqueInput
  }

  /**
   * AssistantMessage findUniqueOrThrow
   */
  export type AssistantMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantMessage
     */
    select?: AssistantMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssistantMessage
     */
    omit?: AssistantMessageOmit<ExtArgs> | null
    /**
     * Filter, which AssistantMessage to fetch.
     */
    where: AssistantMessageWhereUniqueInput
  }

  /**
   * AssistantMessage findFirst
   */
  export type AssistantMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantMessage
     */
    select?: AssistantMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssistantMessage
     */
    omit?: AssistantMessageOmit<ExtArgs> | null
    /**
     * Filter, which AssistantMessage to fetch.
     */
    where?: AssistantMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssistantMessages to fetch.
     */
    orderBy?: AssistantMessageOrderByWithRelationInput | AssistantMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssistantMessages.
     */
    cursor?: AssistantMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssistantMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssistantMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssistantMessages.
     */
    distinct?: AssistantMessageScalarFieldEnum | AssistantMessageScalarFieldEnum[]
  }

  /**
   * AssistantMessage findFirstOrThrow
   */
  export type AssistantMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantMessage
     */
    select?: AssistantMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssistantMessage
     */
    omit?: AssistantMessageOmit<ExtArgs> | null
    /**
     * Filter, which AssistantMessage to fetch.
     */
    where?: AssistantMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssistantMessages to fetch.
     */
    orderBy?: AssistantMessageOrderByWithRelationInput | AssistantMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssistantMessages.
     */
    cursor?: AssistantMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssistantMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssistantMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssistantMessages.
     */
    distinct?: AssistantMessageScalarFieldEnum | AssistantMessageScalarFieldEnum[]
  }

  /**
   * AssistantMessage findMany
   */
  export type AssistantMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantMessage
     */
    select?: AssistantMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssistantMessage
     */
    omit?: AssistantMessageOmit<ExtArgs> | null
    /**
     * Filter, which AssistantMessages to fetch.
     */
    where?: AssistantMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssistantMessages to fetch.
     */
    orderBy?: AssistantMessageOrderByWithRelationInput | AssistantMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AssistantMessages.
     */
    cursor?: AssistantMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssistantMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssistantMessages.
     */
    skip?: number
    distinct?: AssistantMessageScalarFieldEnum | AssistantMessageScalarFieldEnum[]
  }

  /**
   * AssistantMessage create
   */
  export type AssistantMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantMessage
     */
    select?: AssistantMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssistantMessage
     */
    omit?: AssistantMessageOmit<ExtArgs> | null
    /**
     * The data needed to create a AssistantMessage.
     */
    data: XOR<AssistantMessageCreateInput, AssistantMessageUncheckedCreateInput>
  }

  /**
   * AssistantMessage createMany
   */
  export type AssistantMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AssistantMessages.
     */
    data: AssistantMessageCreateManyInput | AssistantMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AssistantMessage createManyAndReturn
   */
  export type AssistantMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantMessage
     */
    select?: AssistantMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssistantMessage
     */
    omit?: AssistantMessageOmit<ExtArgs> | null
    /**
     * The data used to create many AssistantMessages.
     */
    data: AssistantMessageCreateManyInput | AssistantMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AssistantMessage update
   */
  export type AssistantMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantMessage
     */
    select?: AssistantMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssistantMessage
     */
    omit?: AssistantMessageOmit<ExtArgs> | null
    /**
     * The data needed to update a AssistantMessage.
     */
    data: XOR<AssistantMessageUpdateInput, AssistantMessageUncheckedUpdateInput>
    /**
     * Choose, which AssistantMessage to update.
     */
    where: AssistantMessageWhereUniqueInput
  }

  /**
   * AssistantMessage updateMany
   */
  export type AssistantMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AssistantMessages.
     */
    data: XOR<AssistantMessageUpdateManyMutationInput, AssistantMessageUncheckedUpdateManyInput>
    /**
     * Filter which AssistantMessages to update
     */
    where?: AssistantMessageWhereInput
    /**
     * Limit how many AssistantMessages to update.
     */
    limit?: number
  }

  /**
   * AssistantMessage updateManyAndReturn
   */
  export type AssistantMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantMessage
     */
    select?: AssistantMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssistantMessage
     */
    omit?: AssistantMessageOmit<ExtArgs> | null
    /**
     * The data used to update AssistantMessages.
     */
    data: XOR<AssistantMessageUpdateManyMutationInput, AssistantMessageUncheckedUpdateManyInput>
    /**
     * Filter which AssistantMessages to update
     */
    where?: AssistantMessageWhereInput
    /**
     * Limit how many AssistantMessages to update.
     */
    limit?: number
  }

  /**
   * AssistantMessage upsert
   */
  export type AssistantMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantMessage
     */
    select?: AssistantMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssistantMessage
     */
    omit?: AssistantMessageOmit<ExtArgs> | null
    /**
     * The filter to search for the AssistantMessage to update in case it exists.
     */
    where: AssistantMessageWhereUniqueInput
    /**
     * In case the AssistantMessage found by the `where` argument doesn't exist, create a new AssistantMessage with this data.
     */
    create: XOR<AssistantMessageCreateInput, AssistantMessageUncheckedCreateInput>
    /**
     * In case the AssistantMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssistantMessageUpdateInput, AssistantMessageUncheckedUpdateInput>
  }

  /**
   * AssistantMessage delete
   */
  export type AssistantMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantMessage
     */
    select?: AssistantMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssistantMessage
     */
    omit?: AssistantMessageOmit<ExtArgs> | null
    /**
     * Filter which AssistantMessage to delete.
     */
    where: AssistantMessageWhereUniqueInput
  }

  /**
   * AssistantMessage deleteMany
   */
  export type AssistantMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssistantMessages to delete
     */
    where?: AssistantMessageWhereInput
    /**
     * Limit how many AssistantMessages to delete.
     */
    limit?: number
  }

  /**
   * AssistantMessage without action
   */
  export type AssistantMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssistantMessage
     */
    select?: AssistantMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssistantMessage
     */
    omit?: AssistantMessageOmit<ExtArgs> | null
  }


  /**
   * Model HealthCenter
   */

  export type AggregateHealthCenter = {
    _count: HealthCenterCountAggregateOutputType | null
    _avg: HealthCenterAvgAggregateOutputType | null
    _sum: HealthCenterSumAggregateOutputType | null
    _min: HealthCenterMinAggregateOutputType | null
    _max: HealthCenterMaxAggregateOutputType | null
  }

  export type HealthCenterAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type HealthCenterSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type HealthCenterMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    city: string | null
    address: string | null
    latitude: number | null
    longitude: number | null
    phone: string | null
    priceInfo: string | null
    isGirlFriendly: boolean | null
    isPartner: boolean | null
    createdAt: Date | null
  }

  export type HealthCenterMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    city: string | null
    address: string | null
    latitude: number | null
    longitude: number | null
    phone: string | null
    priceInfo: string | null
    isGirlFriendly: boolean | null
    isPartner: boolean | null
    createdAt: Date | null
  }

  export type HealthCenterCountAggregateOutputType = {
    id: number
    name: number
    description: number
    city: number
    address: number
    latitude: number
    longitude: number
    phone: number
    priceInfo: number
    isGirlFriendly: number
    isPartner: number
    createdAt: number
    _all: number
  }


  export type HealthCenterAvgAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type HealthCenterSumAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type HealthCenterMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    city?: true
    address?: true
    latitude?: true
    longitude?: true
    phone?: true
    priceInfo?: true
    isGirlFriendly?: true
    isPartner?: true
    createdAt?: true
  }

  export type HealthCenterMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    city?: true
    address?: true
    latitude?: true
    longitude?: true
    phone?: true
    priceInfo?: true
    isGirlFriendly?: true
    isPartner?: true
    createdAt?: true
  }

  export type HealthCenterCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    city?: true
    address?: true
    latitude?: true
    longitude?: true
    phone?: true
    priceInfo?: true
    isGirlFriendly?: true
    isPartner?: true
    createdAt?: true
    _all?: true
  }

  export type HealthCenterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HealthCenter to aggregate.
     */
    where?: HealthCenterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthCenters to fetch.
     */
    orderBy?: HealthCenterOrderByWithRelationInput | HealthCenterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HealthCenterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthCenters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthCenters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HealthCenters
    **/
    _count?: true | HealthCenterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HealthCenterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HealthCenterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HealthCenterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HealthCenterMaxAggregateInputType
  }

  export type GetHealthCenterAggregateType<T extends HealthCenterAggregateArgs> = {
        [P in keyof T & keyof AggregateHealthCenter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHealthCenter[P]>
      : GetScalarType<T[P], AggregateHealthCenter[P]>
  }




  export type HealthCenterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HealthCenterWhereInput
    orderBy?: HealthCenterOrderByWithAggregationInput | HealthCenterOrderByWithAggregationInput[]
    by: HealthCenterScalarFieldEnum[] | HealthCenterScalarFieldEnum
    having?: HealthCenterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HealthCenterCountAggregateInputType | true
    _avg?: HealthCenterAvgAggregateInputType
    _sum?: HealthCenterSumAggregateInputType
    _min?: HealthCenterMinAggregateInputType
    _max?: HealthCenterMaxAggregateInputType
  }

  export type HealthCenterGroupByOutputType = {
    id: string
    name: string
    description: string
    city: string
    address: string
    latitude: number
    longitude: number
    phone: string
    priceInfo: string
    isGirlFriendly: boolean
    isPartner: boolean
    createdAt: Date
    _count: HealthCenterCountAggregateOutputType | null
    _avg: HealthCenterAvgAggregateOutputType | null
    _sum: HealthCenterSumAggregateOutputType | null
    _min: HealthCenterMinAggregateOutputType | null
    _max: HealthCenterMaxAggregateOutputType | null
  }

  type GetHealthCenterGroupByPayload<T extends HealthCenterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HealthCenterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HealthCenterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HealthCenterGroupByOutputType[P]>
            : GetScalarType<T[P], HealthCenterGroupByOutputType[P]>
        }
      >
    >


  export type HealthCenterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    city?: boolean
    address?: boolean
    latitude?: boolean
    longitude?: boolean
    phone?: boolean
    priceInfo?: boolean
    isGirlFriendly?: boolean
    isPartner?: boolean
    createdAt?: boolean
    vouchers?: boolean | HealthCenter$vouchersArgs<ExtArgs>
    _count?: boolean | HealthCenterCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["healthCenter"]>

  export type HealthCenterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    city?: boolean
    address?: boolean
    latitude?: boolean
    longitude?: boolean
    phone?: boolean
    priceInfo?: boolean
    isGirlFriendly?: boolean
    isPartner?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["healthCenter"]>

  export type HealthCenterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    city?: boolean
    address?: boolean
    latitude?: boolean
    longitude?: boolean
    phone?: boolean
    priceInfo?: boolean
    isGirlFriendly?: boolean
    isPartner?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["healthCenter"]>

  export type HealthCenterSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    city?: boolean
    address?: boolean
    latitude?: boolean
    longitude?: boolean
    phone?: boolean
    priceInfo?: boolean
    isGirlFriendly?: boolean
    isPartner?: boolean
    createdAt?: boolean
  }

  export type HealthCenterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "city" | "address" | "latitude" | "longitude" | "phone" | "priceInfo" | "isGirlFriendly" | "isPartner" | "createdAt", ExtArgs["result"]["healthCenter"]>
  export type HealthCenterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vouchers?: boolean | HealthCenter$vouchersArgs<ExtArgs>
    _count?: boolean | HealthCenterCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type HealthCenterIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type HealthCenterIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $HealthCenterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HealthCenter"
    objects: {
      vouchers: Prisma.$HealthVoucherPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      city: string
      address: string
      latitude: number
      longitude: number
      phone: string
      priceInfo: string
      isGirlFriendly: boolean
      isPartner: boolean
      createdAt: Date
    }, ExtArgs["result"]["healthCenter"]>
    composites: {}
  }

  type HealthCenterGetPayload<S extends boolean | null | undefined | HealthCenterDefaultArgs> = $Result.GetResult<Prisma.$HealthCenterPayload, S>

  type HealthCenterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HealthCenterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HealthCenterCountAggregateInputType | true
    }

  export interface HealthCenterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HealthCenter'], meta: { name: 'HealthCenter' } }
    /**
     * Find zero or one HealthCenter that matches the filter.
     * @param {HealthCenterFindUniqueArgs} args - Arguments to find a HealthCenter
     * @example
     * // Get one HealthCenter
     * const healthCenter = await prisma.healthCenter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HealthCenterFindUniqueArgs>(args: SelectSubset<T, HealthCenterFindUniqueArgs<ExtArgs>>): Prisma__HealthCenterClient<$Result.GetResult<Prisma.$HealthCenterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HealthCenter that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HealthCenterFindUniqueOrThrowArgs} args - Arguments to find a HealthCenter
     * @example
     * // Get one HealthCenter
     * const healthCenter = await prisma.healthCenter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HealthCenterFindUniqueOrThrowArgs>(args: SelectSubset<T, HealthCenterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HealthCenterClient<$Result.GetResult<Prisma.$HealthCenterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HealthCenter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthCenterFindFirstArgs} args - Arguments to find a HealthCenter
     * @example
     * // Get one HealthCenter
     * const healthCenter = await prisma.healthCenter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HealthCenterFindFirstArgs>(args?: SelectSubset<T, HealthCenterFindFirstArgs<ExtArgs>>): Prisma__HealthCenterClient<$Result.GetResult<Prisma.$HealthCenterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HealthCenter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthCenterFindFirstOrThrowArgs} args - Arguments to find a HealthCenter
     * @example
     * // Get one HealthCenter
     * const healthCenter = await prisma.healthCenter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HealthCenterFindFirstOrThrowArgs>(args?: SelectSubset<T, HealthCenterFindFirstOrThrowArgs<ExtArgs>>): Prisma__HealthCenterClient<$Result.GetResult<Prisma.$HealthCenterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HealthCenters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthCenterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HealthCenters
     * const healthCenters = await prisma.healthCenter.findMany()
     * 
     * // Get first 10 HealthCenters
     * const healthCenters = await prisma.healthCenter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const healthCenterWithIdOnly = await prisma.healthCenter.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HealthCenterFindManyArgs>(args?: SelectSubset<T, HealthCenterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthCenterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HealthCenter.
     * @param {HealthCenterCreateArgs} args - Arguments to create a HealthCenter.
     * @example
     * // Create one HealthCenter
     * const HealthCenter = await prisma.healthCenter.create({
     *   data: {
     *     // ... data to create a HealthCenter
     *   }
     * })
     * 
     */
    create<T extends HealthCenterCreateArgs>(args: SelectSubset<T, HealthCenterCreateArgs<ExtArgs>>): Prisma__HealthCenterClient<$Result.GetResult<Prisma.$HealthCenterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HealthCenters.
     * @param {HealthCenterCreateManyArgs} args - Arguments to create many HealthCenters.
     * @example
     * // Create many HealthCenters
     * const healthCenter = await prisma.healthCenter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HealthCenterCreateManyArgs>(args?: SelectSubset<T, HealthCenterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HealthCenters and returns the data saved in the database.
     * @param {HealthCenterCreateManyAndReturnArgs} args - Arguments to create many HealthCenters.
     * @example
     * // Create many HealthCenters
     * const healthCenter = await prisma.healthCenter.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HealthCenters and only return the `id`
     * const healthCenterWithIdOnly = await prisma.healthCenter.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HealthCenterCreateManyAndReturnArgs>(args?: SelectSubset<T, HealthCenterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthCenterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HealthCenter.
     * @param {HealthCenterDeleteArgs} args - Arguments to delete one HealthCenter.
     * @example
     * // Delete one HealthCenter
     * const HealthCenter = await prisma.healthCenter.delete({
     *   where: {
     *     // ... filter to delete one HealthCenter
     *   }
     * })
     * 
     */
    delete<T extends HealthCenterDeleteArgs>(args: SelectSubset<T, HealthCenterDeleteArgs<ExtArgs>>): Prisma__HealthCenterClient<$Result.GetResult<Prisma.$HealthCenterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HealthCenter.
     * @param {HealthCenterUpdateArgs} args - Arguments to update one HealthCenter.
     * @example
     * // Update one HealthCenter
     * const healthCenter = await prisma.healthCenter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HealthCenterUpdateArgs>(args: SelectSubset<T, HealthCenterUpdateArgs<ExtArgs>>): Prisma__HealthCenterClient<$Result.GetResult<Prisma.$HealthCenterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HealthCenters.
     * @param {HealthCenterDeleteManyArgs} args - Arguments to filter HealthCenters to delete.
     * @example
     * // Delete a few HealthCenters
     * const { count } = await prisma.healthCenter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HealthCenterDeleteManyArgs>(args?: SelectSubset<T, HealthCenterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HealthCenters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthCenterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HealthCenters
     * const healthCenter = await prisma.healthCenter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HealthCenterUpdateManyArgs>(args: SelectSubset<T, HealthCenterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HealthCenters and returns the data updated in the database.
     * @param {HealthCenterUpdateManyAndReturnArgs} args - Arguments to update many HealthCenters.
     * @example
     * // Update many HealthCenters
     * const healthCenter = await prisma.healthCenter.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HealthCenters and only return the `id`
     * const healthCenterWithIdOnly = await prisma.healthCenter.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HealthCenterUpdateManyAndReturnArgs>(args: SelectSubset<T, HealthCenterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthCenterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HealthCenter.
     * @param {HealthCenterUpsertArgs} args - Arguments to update or create a HealthCenter.
     * @example
     * // Update or create a HealthCenter
     * const healthCenter = await prisma.healthCenter.upsert({
     *   create: {
     *     // ... data to create a HealthCenter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HealthCenter we want to update
     *   }
     * })
     */
    upsert<T extends HealthCenterUpsertArgs>(args: SelectSubset<T, HealthCenterUpsertArgs<ExtArgs>>): Prisma__HealthCenterClient<$Result.GetResult<Prisma.$HealthCenterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HealthCenters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthCenterCountArgs} args - Arguments to filter HealthCenters to count.
     * @example
     * // Count the number of HealthCenters
     * const count = await prisma.healthCenter.count({
     *   where: {
     *     // ... the filter for the HealthCenters we want to count
     *   }
     * })
    **/
    count<T extends HealthCenterCountArgs>(
      args?: Subset<T, HealthCenterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HealthCenterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HealthCenter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthCenterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HealthCenterAggregateArgs>(args: Subset<T, HealthCenterAggregateArgs>): Prisma.PrismaPromise<GetHealthCenterAggregateType<T>>

    /**
     * Group by HealthCenter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthCenterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HealthCenterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HealthCenterGroupByArgs['orderBy'] }
        : { orderBy?: HealthCenterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HealthCenterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHealthCenterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HealthCenter model
   */
  readonly fields: HealthCenterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HealthCenter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HealthCenterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vouchers<T extends HealthCenter$vouchersArgs<ExtArgs> = {}>(args?: Subset<T, HealthCenter$vouchersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthVoucherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HealthCenter model
   */
  interface HealthCenterFieldRefs {
    readonly id: FieldRef<"HealthCenter", 'String'>
    readonly name: FieldRef<"HealthCenter", 'String'>
    readonly description: FieldRef<"HealthCenter", 'String'>
    readonly city: FieldRef<"HealthCenter", 'String'>
    readonly address: FieldRef<"HealthCenter", 'String'>
    readonly latitude: FieldRef<"HealthCenter", 'Float'>
    readonly longitude: FieldRef<"HealthCenter", 'Float'>
    readonly phone: FieldRef<"HealthCenter", 'String'>
    readonly priceInfo: FieldRef<"HealthCenter", 'String'>
    readonly isGirlFriendly: FieldRef<"HealthCenter", 'Boolean'>
    readonly isPartner: FieldRef<"HealthCenter", 'Boolean'>
    readonly createdAt: FieldRef<"HealthCenter", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HealthCenter findUnique
   */
  export type HealthCenterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthCenter
     */
    select?: HealthCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthCenter
     */
    omit?: HealthCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthCenterInclude<ExtArgs> | null
    /**
     * Filter, which HealthCenter to fetch.
     */
    where: HealthCenterWhereUniqueInput
  }

  /**
   * HealthCenter findUniqueOrThrow
   */
  export type HealthCenterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthCenter
     */
    select?: HealthCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthCenter
     */
    omit?: HealthCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthCenterInclude<ExtArgs> | null
    /**
     * Filter, which HealthCenter to fetch.
     */
    where: HealthCenterWhereUniqueInput
  }

  /**
   * HealthCenter findFirst
   */
  export type HealthCenterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthCenter
     */
    select?: HealthCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthCenter
     */
    omit?: HealthCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthCenterInclude<ExtArgs> | null
    /**
     * Filter, which HealthCenter to fetch.
     */
    where?: HealthCenterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthCenters to fetch.
     */
    orderBy?: HealthCenterOrderByWithRelationInput | HealthCenterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HealthCenters.
     */
    cursor?: HealthCenterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthCenters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthCenters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HealthCenters.
     */
    distinct?: HealthCenterScalarFieldEnum | HealthCenterScalarFieldEnum[]
  }

  /**
   * HealthCenter findFirstOrThrow
   */
  export type HealthCenterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthCenter
     */
    select?: HealthCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthCenter
     */
    omit?: HealthCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthCenterInclude<ExtArgs> | null
    /**
     * Filter, which HealthCenter to fetch.
     */
    where?: HealthCenterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthCenters to fetch.
     */
    orderBy?: HealthCenterOrderByWithRelationInput | HealthCenterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HealthCenters.
     */
    cursor?: HealthCenterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthCenters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthCenters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HealthCenters.
     */
    distinct?: HealthCenterScalarFieldEnum | HealthCenterScalarFieldEnum[]
  }

  /**
   * HealthCenter findMany
   */
  export type HealthCenterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthCenter
     */
    select?: HealthCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthCenter
     */
    omit?: HealthCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthCenterInclude<ExtArgs> | null
    /**
     * Filter, which HealthCenters to fetch.
     */
    where?: HealthCenterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthCenters to fetch.
     */
    orderBy?: HealthCenterOrderByWithRelationInput | HealthCenterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HealthCenters.
     */
    cursor?: HealthCenterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthCenters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthCenters.
     */
    skip?: number
    distinct?: HealthCenterScalarFieldEnum | HealthCenterScalarFieldEnum[]
  }

  /**
   * HealthCenter create
   */
  export type HealthCenterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthCenter
     */
    select?: HealthCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthCenter
     */
    omit?: HealthCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthCenterInclude<ExtArgs> | null
    /**
     * The data needed to create a HealthCenter.
     */
    data: XOR<HealthCenterCreateInput, HealthCenterUncheckedCreateInput>
  }

  /**
   * HealthCenter createMany
   */
  export type HealthCenterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HealthCenters.
     */
    data: HealthCenterCreateManyInput | HealthCenterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HealthCenter createManyAndReturn
   */
  export type HealthCenterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthCenter
     */
    select?: HealthCenterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HealthCenter
     */
    omit?: HealthCenterOmit<ExtArgs> | null
    /**
     * The data used to create many HealthCenters.
     */
    data: HealthCenterCreateManyInput | HealthCenterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HealthCenter update
   */
  export type HealthCenterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthCenter
     */
    select?: HealthCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthCenter
     */
    omit?: HealthCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthCenterInclude<ExtArgs> | null
    /**
     * The data needed to update a HealthCenter.
     */
    data: XOR<HealthCenterUpdateInput, HealthCenterUncheckedUpdateInput>
    /**
     * Choose, which HealthCenter to update.
     */
    where: HealthCenterWhereUniqueInput
  }

  /**
   * HealthCenter updateMany
   */
  export type HealthCenterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HealthCenters.
     */
    data: XOR<HealthCenterUpdateManyMutationInput, HealthCenterUncheckedUpdateManyInput>
    /**
     * Filter which HealthCenters to update
     */
    where?: HealthCenterWhereInput
    /**
     * Limit how many HealthCenters to update.
     */
    limit?: number
  }

  /**
   * HealthCenter updateManyAndReturn
   */
  export type HealthCenterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthCenter
     */
    select?: HealthCenterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HealthCenter
     */
    omit?: HealthCenterOmit<ExtArgs> | null
    /**
     * The data used to update HealthCenters.
     */
    data: XOR<HealthCenterUpdateManyMutationInput, HealthCenterUncheckedUpdateManyInput>
    /**
     * Filter which HealthCenters to update
     */
    where?: HealthCenterWhereInput
    /**
     * Limit how many HealthCenters to update.
     */
    limit?: number
  }

  /**
   * HealthCenter upsert
   */
  export type HealthCenterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthCenter
     */
    select?: HealthCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthCenter
     */
    omit?: HealthCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthCenterInclude<ExtArgs> | null
    /**
     * The filter to search for the HealthCenter to update in case it exists.
     */
    where: HealthCenterWhereUniqueInput
    /**
     * In case the HealthCenter found by the `where` argument doesn't exist, create a new HealthCenter with this data.
     */
    create: XOR<HealthCenterCreateInput, HealthCenterUncheckedCreateInput>
    /**
     * In case the HealthCenter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HealthCenterUpdateInput, HealthCenterUncheckedUpdateInput>
  }

  /**
   * HealthCenter delete
   */
  export type HealthCenterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthCenter
     */
    select?: HealthCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthCenter
     */
    omit?: HealthCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthCenterInclude<ExtArgs> | null
    /**
     * Filter which HealthCenter to delete.
     */
    where: HealthCenterWhereUniqueInput
  }

  /**
   * HealthCenter deleteMany
   */
  export type HealthCenterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HealthCenters to delete
     */
    where?: HealthCenterWhereInput
    /**
     * Limit how many HealthCenters to delete.
     */
    limit?: number
  }

  /**
   * HealthCenter.vouchers
   */
  export type HealthCenter$vouchersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthVoucher
     */
    select?: HealthVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthVoucher
     */
    omit?: HealthVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthVoucherInclude<ExtArgs> | null
    where?: HealthVoucherWhereInput
    orderBy?: HealthVoucherOrderByWithRelationInput | HealthVoucherOrderByWithRelationInput[]
    cursor?: HealthVoucherWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HealthVoucherScalarFieldEnum | HealthVoucherScalarFieldEnum[]
  }

  /**
   * HealthCenter without action
   */
  export type HealthCenterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthCenter
     */
    select?: HealthCenterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthCenter
     */
    omit?: HealthCenterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthCenterInclude<ExtArgs> | null
  }


  /**
   * Model HealthVoucher
   */

  export type AggregateHealthVoucher = {
    _count: HealthVoucherCountAggregateOutputType | null
    _min: HealthVoucherMinAggregateOutputType | null
    _max: HealthVoucherMaxAggregateOutputType | null
  }

  export type HealthVoucherMinAggregateOutputType = {
    id: string | null
    code: string | null
    anonId: string | null
    healthCenterId: string | null
    status: string | null
    expiresAt: Date | null
    usedAt: Date | null
    qrData: string | null
    createdAt: Date | null
  }

  export type HealthVoucherMaxAggregateOutputType = {
    id: string | null
    code: string | null
    anonId: string | null
    healthCenterId: string | null
    status: string | null
    expiresAt: Date | null
    usedAt: Date | null
    qrData: string | null
    createdAt: Date | null
  }

  export type HealthVoucherCountAggregateOutputType = {
    id: number
    code: number
    anonId: number
    healthCenterId: number
    status: number
    expiresAt: number
    usedAt: number
    qrData: number
    createdAt: number
    _all: number
  }


  export type HealthVoucherMinAggregateInputType = {
    id?: true
    code?: true
    anonId?: true
    healthCenterId?: true
    status?: true
    expiresAt?: true
    usedAt?: true
    qrData?: true
    createdAt?: true
  }

  export type HealthVoucherMaxAggregateInputType = {
    id?: true
    code?: true
    anonId?: true
    healthCenterId?: true
    status?: true
    expiresAt?: true
    usedAt?: true
    qrData?: true
    createdAt?: true
  }

  export type HealthVoucherCountAggregateInputType = {
    id?: true
    code?: true
    anonId?: true
    healthCenterId?: true
    status?: true
    expiresAt?: true
    usedAt?: true
    qrData?: true
    createdAt?: true
    _all?: true
  }

  export type HealthVoucherAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HealthVoucher to aggregate.
     */
    where?: HealthVoucherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthVouchers to fetch.
     */
    orderBy?: HealthVoucherOrderByWithRelationInput | HealthVoucherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HealthVoucherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthVouchers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthVouchers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HealthVouchers
    **/
    _count?: true | HealthVoucherCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HealthVoucherMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HealthVoucherMaxAggregateInputType
  }

  export type GetHealthVoucherAggregateType<T extends HealthVoucherAggregateArgs> = {
        [P in keyof T & keyof AggregateHealthVoucher]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHealthVoucher[P]>
      : GetScalarType<T[P], AggregateHealthVoucher[P]>
  }




  export type HealthVoucherGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HealthVoucherWhereInput
    orderBy?: HealthVoucherOrderByWithAggregationInput | HealthVoucherOrderByWithAggregationInput[]
    by: HealthVoucherScalarFieldEnum[] | HealthVoucherScalarFieldEnum
    having?: HealthVoucherScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HealthVoucherCountAggregateInputType | true
    _min?: HealthVoucherMinAggregateInputType
    _max?: HealthVoucherMaxAggregateInputType
  }

  export type HealthVoucherGroupByOutputType = {
    id: string
    code: string
    anonId: string
    healthCenterId: string
    status: string
    expiresAt: Date
    usedAt: Date | null
    qrData: string
    createdAt: Date
    _count: HealthVoucherCountAggregateOutputType | null
    _min: HealthVoucherMinAggregateOutputType | null
    _max: HealthVoucherMaxAggregateOutputType | null
  }

  type GetHealthVoucherGroupByPayload<T extends HealthVoucherGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HealthVoucherGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HealthVoucherGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HealthVoucherGroupByOutputType[P]>
            : GetScalarType<T[P], HealthVoucherGroupByOutputType[P]>
        }
      >
    >


  export type HealthVoucherSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    anonId?: boolean
    healthCenterId?: boolean
    status?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    qrData?: boolean
    createdAt?: boolean
    healthCenter?: boolean | HealthCenterDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["healthVoucher"]>

  export type HealthVoucherSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    anonId?: boolean
    healthCenterId?: boolean
    status?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    qrData?: boolean
    createdAt?: boolean
    healthCenter?: boolean | HealthCenterDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["healthVoucher"]>

  export type HealthVoucherSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    anonId?: boolean
    healthCenterId?: boolean
    status?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    qrData?: boolean
    createdAt?: boolean
    healthCenter?: boolean | HealthCenterDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["healthVoucher"]>

  export type HealthVoucherSelectScalar = {
    id?: boolean
    code?: boolean
    anonId?: boolean
    healthCenterId?: boolean
    status?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    qrData?: boolean
    createdAt?: boolean
  }

  export type HealthVoucherOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "anonId" | "healthCenterId" | "status" | "expiresAt" | "usedAt" | "qrData" | "createdAt", ExtArgs["result"]["healthVoucher"]>
  export type HealthVoucherInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    healthCenter?: boolean | HealthCenterDefaultArgs<ExtArgs>
  }
  export type HealthVoucherIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    healthCenter?: boolean | HealthCenterDefaultArgs<ExtArgs>
  }
  export type HealthVoucherIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    healthCenter?: boolean | HealthCenterDefaultArgs<ExtArgs>
  }

  export type $HealthVoucherPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HealthVoucher"
    objects: {
      healthCenter: Prisma.$HealthCenterPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      anonId: string
      healthCenterId: string
      status: string
      expiresAt: Date
      usedAt: Date | null
      qrData: string
      createdAt: Date
    }, ExtArgs["result"]["healthVoucher"]>
    composites: {}
  }

  type HealthVoucherGetPayload<S extends boolean | null | undefined | HealthVoucherDefaultArgs> = $Result.GetResult<Prisma.$HealthVoucherPayload, S>

  type HealthVoucherCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HealthVoucherFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HealthVoucherCountAggregateInputType | true
    }

  export interface HealthVoucherDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HealthVoucher'], meta: { name: 'HealthVoucher' } }
    /**
     * Find zero or one HealthVoucher that matches the filter.
     * @param {HealthVoucherFindUniqueArgs} args - Arguments to find a HealthVoucher
     * @example
     * // Get one HealthVoucher
     * const healthVoucher = await prisma.healthVoucher.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HealthVoucherFindUniqueArgs>(args: SelectSubset<T, HealthVoucherFindUniqueArgs<ExtArgs>>): Prisma__HealthVoucherClient<$Result.GetResult<Prisma.$HealthVoucherPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HealthVoucher that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HealthVoucherFindUniqueOrThrowArgs} args - Arguments to find a HealthVoucher
     * @example
     * // Get one HealthVoucher
     * const healthVoucher = await prisma.healthVoucher.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HealthVoucherFindUniqueOrThrowArgs>(args: SelectSubset<T, HealthVoucherFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HealthVoucherClient<$Result.GetResult<Prisma.$HealthVoucherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HealthVoucher that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthVoucherFindFirstArgs} args - Arguments to find a HealthVoucher
     * @example
     * // Get one HealthVoucher
     * const healthVoucher = await prisma.healthVoucher.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HealthVoucherFindFirstArgs>(args?: SelectSubset<T, HealthVoucherFindFirstArgs<ExtArgs>>): Prisma__HealthVoucherClient<$Result.GetResult<Prisma.$HealthVoucherPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HealthVoucher that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthVoucherFindFirstOrThrowArgs} args - Arguments to find a HealthVoucher
     * @example
     * // Get one HealthVoucher
     * const healthVoucher = await prisma.healthVoucher.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HealthVoucherFindFirstOrThrowArgs>(args?: SelectSubset<T, HealthVoucherFindFirstOrThrowArgs<ExtArgs>>): Prisma__HealthVoucherClient<$Result.GetResult<Prisma.$HealthVoucherPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HealthVouchers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthVoucherFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HealthVouchers
     * const healthVouchers = await prisma.healthVoucher.findMany()
     * 
     * // Get first 10 HealthVouchers
     * const healthVouchers = await prisma.healthVoucher.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const healthVoucherWithIdOnly = await prisma.healthVoucher.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HealthVoucherFindManyArgs>(args?: SelectSubset<T, HealthVoucherFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthVoucherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HealthVoucher.
     * @param {HealthVoucherCreateArgs} args - Arguments to create a HealthVoucher.
     * @example
     * // Create one HealthVoucher
     * const HealthVoucher = await prisma.healthVoucher.create({
     *   data: {
     *     // ... data to create a HealthVoucher
     *   }
     * })
     * 
     */
    create<T extends HealthVoucherCreateArgs>(args: SelectSubset<T, HealthVoucherCreateArgs<ExtArgs>>): Prisma__HealthVoucherClient<$Result.GetResult<Prisma.$HealthVoucherPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HealthVouchers.
     * @param {HealthVoucherCreateManyArgs} args - Arguments to create many HealthVouchers.
     * @example
     * // Create many HealthVouchers
     * const healthVoucher = await prisma.healthVoucher.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HealthVoucherCreateManyArgs>(args?: SelectSubset<T, HealthVoucherCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HealthVouchers and returns the data saved in the database.
     * @param {HealthVoucherCreateManyAndReturnArgs} args - Arguments to create many HealthVouchers.
     * @example
     * // Create many HealthVouchers
     * const healthVoucher = await prisma.healthVoucher.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HealthVouchers and only return the `id`
     * const healthVoucherWithIdOnly = await prisma.healthVoucher.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HealthVoucherCreateManyAndReturnArgs>(args?: SelectSubset<T, HealthVoucherCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthVoucherPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HealthVoucher.
     * @param {HealthVoucherDeleteArgs} args - Arguments to delete one HealthVoucher.
     * @example
     * // Delete one HealthVoucher
     * const HealthVoucher = await prisma.healthVoucher.delete({
     *   where: {
     *     // ... filter to delete one HealthVoucher
     *   }
     * })
     * 
     */
    delete<T extends HealthVoucherDeleteArgs>(args: SelectSubset<T, HealthVoucherDeleteArgs<ExtArgs>>): Prisma__HealthVoucherClient<$Result.GetResult<Prisma.$HealthVoucherPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HealthVoucher.
     * @param {HealthVoucherUpdateArgs} args - Arguments to update one HealthVoucher.
     * @example
     * // Update one HealthVoucher
     * const healthVoucher = await prisma.healthVoucher.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HealthVoucherUpdateArgs>(args: SelectSubset<T, HealthVoucherUpdateArgs<ExtArgs>>): Prisma__HealthVoucherClient<$Result.GetResult<Prisma.$HealthVoucherPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HealthVouchers.
     * @param {HealthVoucherDeleteManyArgs} args - Arguments to filter HealthVouchers to delete.
     * @example
     * // Delete a few HealthVouchers
     * const { count } = await prisma.healthVoucher.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HealthVoucherDeleteManyArgs>(args?: SelectSubset<T, HealthVoucherDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HealthVouchers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthVoucherUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HealthVouchers
     * const healthVoucher = await prisma.healthVoucher.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HealthVoucherUpdateManyArgs>(args: SelectSubset<T, HealthVoucherUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HealthVouchers and returns the data updated in the database.
     * @param {HealthVoucherUpdateManyAndReturnArgs} args - Arguments to update many HealthVouchers.
     * @example
     * // Update many HealthVouchers
     * const healthVoucher = await prisma.healthVoucher.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HealthVouchers and only return the `id`
     * const healthVoucherWithIdOnly = await prisma.healthVoucher.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HealthVoucherUpdateManyAndReturnArgs>(args: SelectSubset<T, HealthVoucherUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthVoucherPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HealthVoucher.
     * @param {HealthVoucherUpsertArgs} args - Arguments to update or create a HealthVoucher.
     * @example
     * // Update or create a HealthVoucher
     * const healthVoucher = await prisma.healthVoucher.upsert({
     *   create: {
     *     // ... data to create a HealthVoucher
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HealthVoucher we want to update
     *   }
     * })
     */
    upsert<T extends HealthVoucherUpsertArgs>(args: SelectSubset<T, HealthVoucherUpsertArgs<ExtArgs>>): Prisma__HealthVoucherClient<$Result.GetResult<Prisma.$HealthVoucherPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HealthVouchers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthVoucherCountArgs} args - Arguments to filter HealthVouchers to count.
     * @example
     * // Count the number of HealthVouchers
     * const count = await prisma.healthVoucher.count({
     *   where: {
     *     // ... the filter for the HealthVouchers we want to count
     *   }
     * })
    **/
    count<T extends HealthVoucherCountArgs>(
      args?: Subset<T, HealthVoucherCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HealthVoucherCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HealthVoucher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthVoucherAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HealthVoucherAggregateArgs>(args: Subset<T, HealthVoucherAggregateArgs>): Prisma.PrismaPromise<GetHealthVoucherAggregateType<T>>

    /**
     * Group by HealthVoucher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthVoucherGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HealthVoucherGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HealthVoucherGroupByArgs['orderBy'] }
        : { orderBy?: HealthVoucherGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HealthVoucherGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHealthVoucherGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HealthVoucher model
   */
  readonly fields: HealthVoucherFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HealthVoucher.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HealthVoucherClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    healthCenter<T extends HealthCenterDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HealthCenterDefaultArgs<ExtArgs>>): Prisma__HealthCenterClient<$Result.GetResult<Prisma.$HealthCenterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HealthVoucher model
   */
  interface HealthVoucherFieldRefs {
    readonly id: FieldRef<"HealthVoucher", 'String'>
    readonly code: FieldRef<"HealthVoucher", 'String'>
    readonly anonId: FieldRef<"HealthVoucher", 'String'>
    readonly healthCenterId: FieldRef<"HealthVoucher", 'String'>
    readonly status: FieldRef<"HealthVoucher", 'String'>
    readonly expiresAt: FieldRef<"HealthVoucher", 'DateTime'>
    readonly usedAt: FieldRef<"HealthVoucher", 'DateTime'>
    readonly qrData: FieldRef<"HealthVoucher", 'String'>
    readonly createdAt: FieldRef<"HealthVoucher", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HealthVoucher findUnique
   */
  export type HealthVoucherFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthVoucher
     */
    select?: HealthVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthVoucher
     */
    omit?: HealthVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthVoucherInclude<ExtArgs> | null
    /**
     * Filter, which HealthVoucher to fetch.
     */
    where: HealthVoucherWhereUniqueInput
  }

  /**
   * HealthVoucher findUniqueOrThrow
   */
  export type HealthVoucherFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthVoucher
     */
    select?: HealthVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthVoucher
     */
    omit?: HealthVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthVoucherInclude<ExtArgs> | null
    /**
     * Filter, which HealthVoucher to fetch.
     */
    where: HealthVoucherWhereUniqueInput
  }

  /**
   * HealthVoucher findFirst
   */
  export type HealthVoucherFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthVoucher
     */
    select?: HealthVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthVoucher
     */
    omit?: HealthVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthVoucherInclude<ExtArgs> | null
    /**
     * Filter, which HealthVoucher to fetch.
     */
    where?: HealthVoucherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthVouchers to fetch.
     */
    orderBy?: HealthVoucherOrderByWithRelationInput | HealthVoucherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HealthVouchers.
     */
    cursor?: HealthVoucherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthVouchers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthVouchers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HealthVouchers.
     */
    distinct?: HealthVoucherScalarFieldEnum | HealthVoucherScalarFieldEnum[]
  }

  /**
   * HealthVoucher findFirstOrThrow
   */
  export type HealthVoucherFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthVoucher
     */
    select?: HealthVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthVoucher
     */
    omit?: HealthVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthVoucherInclude<ExtArgs> | null
    /**
     * Filter, which HealthVoucher to fetch.
     */
    where?: HealthVoucherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthVouchers to fetch.
     */
    orderBy?: HealthVoucherOrderByWithRelationInput | HealthVoucherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HealthVouchers.
     */
    cursor?: HealthVoucherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthVouchers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthVouchers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HealthVouchers.
     */
    distinct?: HealthVoucherScalarFieldEnum | HealthVoucherScalarFieldEnum[]
  }

  /**
   * HealthVoucher findMany
   */
  export type HealthVoucherFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthVoucher
     */
    select?: HealthVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthVoucher
     */
    omit?: HealthVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthVoucherInclude<ExtArgs> | null
    /**
     * Filter, which HealthVouchers to fetch.
     */
    where?: HealthVoucherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthVouchers to fetch.
     */
    orderBy?: HealthVoucherOrderByWithRelationInput | HealthVoucherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HealthVouchers.
     */
    cursor?: HealthVoucherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthVouchers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthVouchers.
     */
    skip?: number
    distinct?: HealthVoucherScalarFieldEnum | HealthVoucherScalarFieldEnum[]
  }

  /**
   * HealthVoucher create
   */
  export type HealthVoucherCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthVoucher
     */
    select?: HealthVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthVoucher
     */
    omit?: HealthVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthVoucherInclude<ExtArgs> | null
    /**
     * The data needed to create a HealthVoucher.
     */
    data: XOR<HealthVoucherCreateInput, HealthVoucherUncheckedCreateInput>
  }

  /**
   * HealthVoucher createMany
   */
  export type HealthVoucherCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HealthVouchers.
     */
    data: HealthVoucherCreateManyInput | HealthVoucherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HealthVoucher createManyAndReturn
   */
  export type HealthVoucherCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthVoucher
     */
    select?: HealthVoucherSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HealthVoucher
     */
    omit?: HealthVoucherOmit<ExtArgs> | null
    /**
     * The data used to create many HealthVouchers.
     */
    data: HealthVoucherCreateManyInput | HealthVoucherCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthVoucherIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HealthVoucher update
   */
  export type HealthVoucherUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthVoucher
     */
    select?: HealthVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthVoucher
     */
    omit?: HealthVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthVoucherInclude<ExtArgs> | null
    /**
     * The data needed to update a HealthVoucher.
     */
    data: XOR<HealthVoucherUpdateInput, HealthVoucherUncheckedUpdateInput>
    /**
     * Choose, which HealthVoucher to update.
     */
    where: HealthVoucherWhereUniqueInput
  }

  /**
   * HealthVoucher updateMany
   */
  export type HealthVoucherUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HealthVouchers.
     */
    data: XOR<HealthVoucherUpdateManyMutationInput, HealthVoucherUncheckedUpdateManyInput>
    /**
     * Filter which HealthVouchers to update
     */
    where?: HealthVoucherWhereInput
    /**
     * Limit how many HealthVouchers to update.
     */
    limit?: number
  }

  /**
   * HealthVoucher updateManyAndReturn
   */
  export type HealthVoucherUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthVoucher
     */
    select?: HealthVoucherSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HealthVoucher
     */
    omit?: HealthVoucherOmit<ExtArgs> | null
    /**
     * The data used to update HealthVouchers.
     */
    data: XOR<HealthVoucherUpdateManyMutationInput, HealthVoucherUncheckedUpdateManyInput>
    /**
     * Filter which HealthVouchers to update
     */
    where?: HealthVoucherWhereInput
    /**
     * Limit how many HealthVouchers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthVoucherIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HealthVoucher upsert
   */
  export type HealthVoucherUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthVoucher
     */
    select?: HealthVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthVoucher
     */
    omit?: HealthVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthVoucherInclude<ExtArgs> | null
    /**
     * The filter to search for the HealthVoucher to update in case it exists.
     */
    where: HealthVoucherWhereUniqueInput
    /**
     * In case the HealthVoucher found by the `where` argument doesn't exist, create a new HealthVoucher with this data.
     */
    create: XOR<HealthVoucherCreateInput, HealthVoucherUncheckedCreateInput>
    /**
     * In case the HealthVoucher was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HealthVoucherUpdateInput, HealthVoucherUncheckedUpdateInput>
  }

  /**
   * HealthVoucher delete
   */
  export type HealthVoucherDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthVoucher
     */
    select?: HealthVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthVoucher
     */
    omit?: HealthVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthVoucherInclude<ExtArgs> | null
    /**
     * Filter which HealthVoucher to delete.
     */
    where: HealthVoucherWhereUniqueInput
  }

  /**
   * HealthVoucher deleteMany
   */
  export type HealthVoucherDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HealthVouchers to delete
     */
    where?: HealthVoucherWhereInput
    /**
     * Limit how many HealthVouchers to delete.
     */
    limit?: number
  }

  /**
   * HealthVoucher without action
   */
  export type HealthVoucherDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthVoucher
     */
    select?: HealthVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthVoucher
     */
    omit?: HealthVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthVoucherInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CycleEntryScalarFieldEnum: {
    id: 'id',
    anonId: 'anonId',
    startDate: 'startDate',
    endDate: 'endDate',
    cycleLength: 'cycleLength',
    periodLength: 'periodLength',
    flowIntensity: 'flowIntensity',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CycleEntryScalarFieldEnum = (typeof CycleEntryScalarFieldEnum)[keyof typeof CycleEntryScalarFieldEnum]


  export const DailyLogScalarFieldEnum: {
    id: 'id',
    anonId: 'anonId',
    date: 'date',
    mood: 'mood',
    symptoms: 'symptoms',
    encryptedNotes: 'encryptedNotes',
    notesIv: 'notesIv',
    notesAuthTag: 'notesAuthTag',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DailyLogScalarFieldEnum = (typeof DailyLogScalarFieldEnum)[keyof typeof DailyLogScalarFieldEnum]


  export const ForumPostScalarFieldEnum: {
    id: 'id',
    anonId: 'anonId',
    title: 'title',
    category: 'category',
    content: 'content',
    status: 'status',
    reportsCount: 'reportsCount',
    hugReactions: 'hugReactions',
    meTooReactions: 'meTooReactions',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ForumPostScalarFieldEnum = (typeof ForumPostScalarFieldEnum)[keyof typeof ForumPostScalarFieldEnum]


  export const ForumCommentScalarFieldEnum: {
    id: 'id',
    postId: 'postId',
    anonId: 'anonId',
    content: 'content',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ForumCommentScalarFieldEnum = (typeof ForumCommentScalarFieldEnum)[keyof typeof ForumCommentScalarFieldEnum]


  export const ForumReactionScalarFieldEnum: {
    id: 'id',
    postId: 'postId',
    anonId: 'anonId',
    reactionType: 'reactionType',
    createdAt: 'createdAt'
  };

  export type ForumReactionScalarFieldEnum = (typeof ForumReactionScalarFieldEnum)[keyof typeof ForumReactionScalarFieldEnum]


  export const AssistantMessageScalarFieldEnum: {
    id: 'id',
    anonId: 'anonId',
    role: 'role',
    encryptedContent: 'encryptedContent',
    iv: 'iv',
    authTag: 'authTag',
    isCrisis: 'isCrisis',
    createdAt: 'createdAt'
  };

  export type AssistantMessageScalarFieldEnum = (typeof AssistantMessageScalarFieldEnum)[keyof typeof AssistantMessageScalarFieldEnum]


  export const HealthCenterScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    city: 'city',
    address: 'address',
    latitude: 'latitude',
    longitude: 'longitude',
    phone: 'phone',
    priceInfo: 'priceInfo',
    isGirlFriendly: 'isGirlFriendly',
    isPartner: 'isPartner',
    createdAt: 'createdAt'
  };

  export type HealthCenterScalarFieldEnum = (typeof HealthCenterScalarFieldEnum)[keyof typeof HealthCenterScalarFieldEnum]


  export const HealthVoucherScalarFieldEnum: {
    id: 'id',
    code: 'code',
    anonId: 'anonId',
    healthCenterId: 'healthCenterId',
    status: 'status',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    qrData: 'qrData',
    createdAt: 'createdAt'
  };

  export type HealthVoucherScalarFieldEnum = (typeof HealthVoucherScalarFieldEnum)[keyof typeof HealthVoucherScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CycleEntryWhereInput = {
    AND?: CycleEntryWhereInput | CycleEntryWhereInput[]
    OR?: CycleEntryWhereInput[]
    NOT?: CycleEntryWhereInput | CycleEntryWhereInput[]
    id?: StringFilter<"CycleEntry"> | string
    anonId?: StringFilter<"CycleEntry"> | string
    startDate?: DateTimeFilter<"CycleEntry"> | Date | string
    endDate?: DateTimeNullableFilter<"CycleEntry"> | Date | string | null
    cycleLength?: IntNullableFilter<"CycleEntry"> | number | null
    periodLength?: IntNullableFilter<"CycleEntry"> | number | null
    flowIntensity?: StringNullableFilter<"CycleEntry"> | string | null
    createdAt?: DateTimeFilter<"CycleEntry"> | Date | string
    updatedAt?: DateTimeFilter<"CycleEntry"> | Date | string
  }

  export type CycleEntryOrderByWithRelationInput = {
    id?: SortOrder
    anonId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    cycleLength?: SortOrderInput | SortOrder
    periodLength?: SortOrderInput | SortOrder
    flowIntensity?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CycleEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CycleEntryWhereInput | CycleEntryWhereInput[]
    OR?: CycleEntryWhereInput[]
    NOT?: CycleEntryWhereInput | CycleEntryWhereInput[]
    anonId?: StringFilter<"CycleEntry"> | string
    startDate?: DateTimeFilter<"CycleEntry"> | Date | string
    endDate?: DateTimeNullableFilter<"CycleEntry"> | Date | string | null
    cycleLength?: IntNullableFilter<"CycleEntry"> | number | null
    periodLength?: IntNullableFilter<"CycleEntry"> | number | null
    flowIntensity?: StringNullableFilter<"CycleEntry"> | string | null
    createdAt?: DateTimeFilter<"CycleEntry"> | Date | string
    updatedAt?: DateTimeFilter<"CycleEntry"> | Date | string
  }, "id">

  export type CycleEntryOrderByWithAggregationInput = {
    id?: SortOrder
    anonId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    cycleLength?: SortOrderInput | SortOrder
    periodLength?: SortOrderInput | SortOrder
    flowIntensity?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CycleEntryCountOrderByAggregateInput
    _avg?: CycleEntryAvgOrderByAggregateInput
    _max?: CycleEntryMaxOrderByAggregateInput
    _min?: CycleEntryMinOrderByAggregateInput
    _sum?: CycleEntrySumOrderByAggregateInput
  }

  export type CycleEntryScalarWhereWithAggregatesInput = {
    AND?: CycleEntryScalarWhereWithAggregatesInput | CycleEntryScalarWhereWithAggregatesInput[]
    OR?: CycleEntryScalarWhereWithAggregatesInput[]
    NOT?: CycleEntryScalarWhereWithAggregatesInput | CycleEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CycleEntry"> | string
    anonId?: StringWithAggregatesFilter<"CycleEntry"> | string
    startDate?: DateTimeWithAggregatesFilter<"CycleEntry"> | Date | string
    endDate?: DateTimeNullableWithAggregatesFilter<"CycleEntry"> | Date | string | null
    cycleLength?: IntNullableWithAggregatesFilter<"CycleEntry"> | number | null
    periodLength?: IntNullableWithAggregatesFilter<"CycleEntry"> | number | null
    flowIntensity?: StringNullableWithAggregatesFilter<"CycleEntry"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CycleEntry"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CycleEntry"> | Date | string
  }

  export type DailyLogWhereInput = {
    AND?: DailyLogWhereInput | DailyLogWhereInput[]
    OR?: DailyLogWhereInput[]
    NOT?: DailyLogWhereInput | DailyLogWhereInput[]
    id?: StringFilter<"DailyLog"> | string
    anonId?: StringFilter<"DailyLog"> | string
    date?: DateTimeFilter<"DailyLog"> | Date | string
    mood?: StringNullableFilter<"DailyLog"> | string | null
    symptoms?: StringNullableListFilter<"DailyLog">
    encryptedNotes?: StringNullableFilter<"DailyLog"> | string | null
    notesIv?: StringNullableFilter<"DailyLog"> | string | null
    notesAuthTag?: StringNullableFilter<"DailyLog"> | string | null
    createdAt?: DateTimeFilter<"DailyLog"> | Date | string
    updatedAt?: DateTimeFilter<"DailyLog"> | Date | string
  }

  export type DailyLogOrderByWithRelationInput = {
    id?: SortOrder
    anonId?: SortOrder
    date?: SortOrder
    mood?: SortOrderInput | SortOrder
    symptoms?: SortOrder
    encryptedNotes?: SortOrderInput | SortOrder
    notesIv?: SortOrderInput | SortOrder
    notesAuthTag?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    anonId_date?: DailyLogAnonIdDateCompoundUniqueInput
    AND?: DailyLogWhereInput | DailyLogWhereInput[]
    OR?: DailyLogWhereInput[]
    NOT?: DailyLogWhereInput | DailyLogWhereInput[]
    anonId?: StringFilter<"DailyLog"> | string
    date?: DateTimeFilter<"DailyLog"> | Date | string
    mood?: StringNullableFilter<"DailyLog"> | string | null
    symptoms?: StringNullableListFilter<"DailyLog">
    encryptedNotes?: StringNullableFilter<"DailyLog"> | string | null
    notesIv?: StringNullableFilter<"DailyLog"> | string | null
    notesAuthTag?: StringNullableFilter<"DailyLog"> | string | null
    createdAt?: DateTimeFilter<"DailyLog"> | Date | string
    updatedAt?: DateTimeFilter<"DailyLog"> | Date | string
  }, "id" | "anonId_date">

  export type DailyLogOrderByWithAggregationInput = {
    id?: SortOrder
    anonId?: SortOrder
    date?: SortOrder
    mood?: SortOrderInput | SortOrder
    symptoms?: SortOrder
    encryptedNotes?: SortOrderInput | SortOrder
    notesIv?: SortOrderInput | SortOrder
    notesAuthTag?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DailyLogCountOrderByAggregateInput
    _max?: DailyLogMaxOrderByAggregateInput
    _min?: DailyLogMinOrderByAggregateInput
  }

  export type DailyLogScalarWhereWithAggregatesInput = {
    AND?: DailyLogScalarWhereWithAggregatesInput | DailyLogScalarWhereWithAggregatesInput[]
    OR?: DailyLogScalarWhereWithAggregatesInput[]
    NOT?: DailyLogScalarWhereWithAggregatesInput | DailyLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DailyLog"> | string
    anonId?: StringWithAggregatesFilter<"DailyLog"> | string
    date?: DateTimeWithAggregatesFilter<"DailyLog"> | Date | string
    mood?: StringNullableWithAggregatesFilter<"DailyLog"> | string | null
    symptoms?: StringNullableListFilter<"DailyLog">
    encryptedNotes?: StringNullableWithAggregatesFilter<"DailyLog"> | string | null
    notesIv?: StringNullableWithAggregatesFilter<"DailyLog"> | string | null
    notesAuthTag?: StringNullableWithAggregatesFilter<"DailyLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DailyLog"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DailyLog"> | Date | string
  }

  export type ForumPostWhereInput = {
    AND?: ForumPostWhereInput | ForumPostWhereInput[]
    OR?: ForumPostWhereInput[]
    NOT?: ForumPostWhereInput | ForumPostWhereInput[]
    id?: StringFilter<"ForumPost"> | string
    anonId?: StringFilter<"ForumPost"> | string
    title?: StringFilter<"ForumPost"> | string
    category?: StringFilter<"ForumPost"> | string
    content?: StringFilter<"ForumPost"> | string
    status?: StringFilter<"ForumPost"> | string
    reportsCount?: IntFilter<"ForumPost"> | number
    hugReactions?: IntFilter<"ForumPost"> | number
    meTooReactions?: IntFilter<"ForumPost"> | number
    createdAt?: DateTimeFilter<"ForumPost"> | Date | string
    updatedAt?: DateTimeFilter<"ForumPost"> | Date | string
    comments?: ForumCommentListRelationFilter
    reactions?: ForumReactionListRelationFilter
  }

  export type ForumPostOrderByWithRelationInput = {
    id?: SortOrder
    anonId?: SortOrder
    title?: SortOrder
    category?: SortOrder
    content?: SortOrder
    status?: SortOrder
    reportsCount?: SortOrder
    hugReactions?: SortOrder
    meTooReactions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    comments?: ForumCommentOrderByRelationAggregateInput
    reactions?: ForumReactionOrderByRelationAggregateInput
  }

  export type ForumPostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ForumPostWhereInput | ForumPostWhereInput[]
    OR?: ForumPostWhereInput[]
    NOT?: ForumPostWhereInput | ForumPostWhereInput[]
    anonId?: StringFilter<"ForumPost"> | string
    title?: StringFilter<"ForumPost"> | string
    category?: StringFilter<"ForumPost"> | string
    content?: StringFilter<"ForumPost"> | string
    status?: StringFilter<"ForumPost"> | string
    reportsCount?: IntFilter<"ForumPost"> | number
    hugReactions?: IntFilter<"ForumPost"> | number
    meTooReactions?: IntFilter<"ForumPost"> | number
    createdAt?: DateTimeFilter<"ForumPost"> | Date | string
    updatedAt?: DateTimeFilter<"ForumPost"> | Date | string
    comments?: ForumCommentListRelationFilter
    reactions?: ForumReactionListRelationFilter
  }, "id">

  export type ForumPostOrderByWithAggregationInput = {
    id?: SortOrder
    anonId?: SortOrder
    title?: SortOrder
    category?: SortOrder
    content?: SortOrder
    status?: SortOrder
    reportsCount?: SortOrder
    hugReactions?: SortOrder
    meTooReactions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ForumPostCountOrderByAggregateInput
    _avg?: ForumPostAvgOrderByAggregateInput
    _max?: ForumPostMaxOrderByAggregateInput
    _min?: ForumPostMinOrderByAggregateInput
    _sum?: ForumPostSumOrderByAggregateInput
  }

  export type ForumPostScalarWhereWithAggregatesInput = {
    AND?: ForumPostScalarWhereWithAggregatesInput | ForumPostScalarWhereWithAggregatesInput[]
    OR?: ForumPostScalarWhereWithAggregatesInput[]
    NOT?: ForumPostScalarWhereWithAggregatesInput | ForumPostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ForumPost"> | string
    anonId?: StringWithAggregatesFilter<"ForumPost"> | string
    title?: StringWithAggregatesFilter<"ForumPost"> | string
    category?: StringWithAggregatesFilter<"ForumPost"> | string
    content?: StringWithAggregatesFilter<"ForumPost"> | string
    status?: StringWithAggregatesFilter<"ForumPost"> | string
    reportsCount?: IntWithAggregatesFilter<"ForumPost"> | number
    hugReactions?: IntWithAggregatesFilter<"ForumPost"> | number
    meTooReactions?: IntWithAggregatesFilter<"ForumPost"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ForumPost"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ForumPost"> | Date | string
  }

  export type ForumCommentWhereInput = {
    AND?: ForumCommentWhereInput | ForumCommentWhereInput[]
    OR?: ForumCommentWhereInput[]
    NOT?: ForumCommentWhereInput | ForumCommentWhereInput[]
    id?: StringFilter<"ForumComment"> | string
    postId?: StringFilter<"ForumComment"> | string
    anonId?: StringFilter<"ForumComment"> | string
    content?: StringFilter<"ForumComment"> | string
    status?: StringFilter<"ForumComment"> | string
    createdAt?: DateTimeFilter<"ForumComment"> | Date | string
    updatedAt?: DateTimeFilter<"ForumComment"> | Date | string
    post?: XOR<ForumPostScalarRelationFilter, ForumPostWhereInput>
  }

  export type ForumCommentOrderByWithRelationInput = {
    id?: SortOrder
    postId?: SortOrder
    anonId?: SortOrder
    content?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    post?: ForumPostOrderByWithRelationInput
  }

  export type ForumCommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ForumCommentWhereInput | ForumCommentWhereInput[]
    OR?: ForumCommentWhereInput[]
    NOT?: ForumCommentWhereInput | ForumCommentWhereInput[]
    postId?: StringFilter<"ForumComment"> | string
    anonId?: StringFilter<"ForumComment"> | string
    content?: StringFilter<"ForumComment"> | string
    status?: StringFilter<"ForumComment"> | string
    createdAt?: DateTimeFilter<"ForumComment"> | Date | string
    updatedAt?: DateTimeFilter<"ForumComment"> | Date | string
    post?: XOR<ForumPostScalarRelationFilter, ForumPostWhereInput>
  }, "id">

  export type ForumCommentOrderByWithAggregationInput = {
    id?: SortOrder
    postId?: SortOrder
    anonId?: SortOrder
    content?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ForumCommentCountOrderByAggregateInput
    _max?: ForumCommentMaxOrderByAggregateInput
    _min?: ForumCommentMinOrderByAggregateInput
  }

  export type ForumCommentScalarWhereWithAggregatesInput = {
    AND?: ForumCommentScalarWhereWithAggregatesInput | ForumCommentScalarWhereWithAggregatesInput[]
    OR?: ForumCommentScalarWhereWithAggregatesInput[]
    NOT?: ForumCommentScalarWhereWithAggregatesInput | ForumCommentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ForumComment"> | string
    postId?: StringWithAggregatesFilter<"ForumComment"> | string
    anonId?: StringWithAggregatesFilter<"ForumComment"> | string
    content?: StringWithAggregatesFilter<"ForumComment"> | string
    status?: StringWithAggregatesFilter<"ForumComment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ForumComment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ForumComment"> | Date | string
  }

  export type ForumReactionWhereInput = {
    AND?: ForumReactionWhereInput | ForumReactionWhereInput[]
    OR?: ForumReactionWhereInput[]
    NOT?: ForumReactionWhereInput | ForumReactionWhereInput[]
    id?: StringFilter<"ForumReaction"> | string
    postId?: StringFilter<"ForumReaction"> | string
    anonId?: StringFilter<"ForumReaction"> | string
    reactionType?: StringFilter<"ForumReaction"> | string
    createdAt?: DateTimeFilter<"ForumReaction"> | Date | string
    post?: XOR<ForumPostScalarRelationFilter, ForumPostWhereInput>
  }

  export type ForumReactionOrderByWithRelationInput = {
    id?: SortOrder
    postId?: SortOrder
    anonId?: SortOrder
    reactionType?: SortOrder
    createdAt?: SortOrder
    post?: ForumPostOrderByWithRelationInput
  }

  export type ForumReactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    postId_anonId_reactionType?: ForumReactionPostIdAnonIdReactionTypeCompoundUniqueInput
    AND?: ForumReactionWhereInput | ForumReactionWhereInput[]
    OR?: ForumReactionWhereInput[]
    NOT?: ForumReactionWhereInput | ForumReactionWhereInput[]
    postId?: StringFilter<"ForumReaction"> | string
    anonId?: StringFilter<"ForumReaction"> | string
    reactionType?: StringFilter<"ForumReaction"> | string
    createdAt?: DateTimeFilter<"ForumReaction"> | Date | string
    post?: XOR<ForumPostScalarRelationFilter, ForumPostWhereInput>
  }, "id" | "postId_anonId_reactionType">

  export type ForumReactionOrderByWithAggregationInput = {
    id?: SortOrder
    postId?: SortOrder
    anonId?: SortOrder
    reactionType?: SortOrder
    createdAt?: SortOrder
    _count?: ForumReactionCountOrderByAggregateInput
    _max?: ForumReactionMaxOrderByAggregateInput
    _min?: ForumReactionMinOrderByAggregateInput
  }

  export type ForumReactionScalarWhereWithAggregatesInput = {
    AND?: ForumReactionScalarWhereWithAggregatesInput | ForumReactionScalarWhereWithAggregatesInput[]
    OR?: ForumReactionScalarWhereWithAggregatesInput[]
    NOT?: ForumReactionScalarWhereWithAggregatesInput | ForumReactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ForumReaction"> | string
    postId?: StringWithAggregatesFilter<"ForumReaction"> | string
    anonId?: StringWithAggregatesFilter<"ForumReaction"> | string
    reactionType?: StringWithAggregatesFilter<"ForumReaction"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ForumReaction"> | Date | string
  }

  export type AssistantMessageWhereInput = {
    AND?: AssistantMessageWhereInput | AssistantMessageWhereInput[]
    OR?: AssistantMessageWhereInput[]
    NOT?: AssistantMessageWhereInput | AssistantMessageWhereInput[]
    id?: StringFilter<"AssistantMessage"> | string
    anonId?: StringFilter<"AssistantMessage"> | string
    role?: StringFilter<"AssistantMessage"> | string
    encryptedContent?: StringFilter<"AssistantMessage"> | string
    iv?: StringFilter<"AssistantMessage"> | string
    authTag?: StringFilter<"AssistantMessage"> | string
    isCrisis?: BoolFilter<"AssistantMessage"> | boolean
    createdAt?: DateTimeFilter<"AssistantMessage"> | Date | string
  }

  export type AssistantMessageOrderByWithRelationInput = {
    id?: SortOrder
    anonId?: SortOrder
    role?: SortOrder
    encryptedContent?: SortOrder
    iv?: SortOrder
    authTag?: SortOrder
    isCrisis?: SortOrder
    createdAt?: SortOrder
  }

  export type AssistantMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AssistantMessageWhereInput | AssistantMessageWhereInput[]
    OR?: AssistantMessageWhereInput[]
    NOT?: AssistantMessageWhereInput | AssistantMessageWhereInput[]
    anonId?: StringFilter<"AssistantMessage"> | string
    role?: StringFilter<"AssistantMessage"> | string
    encryptedContent?: StringFilter<"AssistantMessage"> | string
    iv?: StringFilter<"AssistantMessage"> | string
    authTag?: StringFilter<"AssistantMessage"> | string
    isCrisis?: BoolFilter<"AssistantMessage"> | boolean
    createdAt?: DateTimeFilter<"AssistantMessage"> | Date | string
  }, "id">

  export type AssistantMessageOrderByWithAggregationInput = {
    id?: SortOrder
    anonId?: SortOrder
    role?: SortOrder
    encryptedContent?: SortOrder
    iv?: SortOrder
    authTag?: SortOrder
    isCrisis?: SortOrder
    createdAt?: SortOrder
    _count?: AssistantMessageCountOrderByAggregateInput
    _max?: AssistantMessageMaxOrderByAggregateInput
    _min?: AssistantMessageMinOrderByAggregateInput
  }

  export type AssistantMessageScalarWhereWithAggregatesInput = {
    AND?: AssistantMessageScalarWhereWithAggregatesInput | AssistantMessageScalarWhereWithAggregatesInput[]
    OR?: AssistantMessageScalarWhereWithAggregatesInput[]
    NOT?: AssistantMessageScalarWhereWithAggregatesInput | AssistantMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AssistantMessage"> | string
    anonId?: StringWithAggregatesFilter<"AssistantMessage"> | string
    role?: StringWithAggregatesFilter<"AssistantMessage"> | string
    encryptedContent?: StringWithAggregatesFilter<"AssistantMessage"> | string
    iv?: StringWithAggregatesFilter<"AssistantMessage"> | string
    authTag?: StringWithAggregatesFilter<"AssistantMessage"> | string
    isCrisis?: BoolWithAggregatesFilter<"AssistantMessage"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"AssistantMessage"> | Date | string
  }

  export type HealthCenterWhereInput = {
    AND?: HealthCenterWhereInput | HealthCenterWhereInput[]
    OR?: HealthCenterWhereInput[]
    NOT?: HealthCenterWhereInput | HealthCenterWhereInput[]
    id?: StringFilter<"HealthCenter"> | string
    name?: StringFilter<"HealthCenter"> | string
    description?: StringFilter<"HealthCenter"> | string
    city?: StringFilter<"HealthCenter"> | string
    address?: StringFilter<"HealthCenter"> | string
    latitude?: FloatFilter<"HealthCenter"> | number
    longitude?: FloatFilter<"HealthCenter"> | number
    phone?: StringFilter<"HealthCenter"> | string
    priceInfo?: StringFilter<"HealthCenter"> | string
    isGirlFriendly?: BoolFilter<"HealthCenter"> | boolean
    isPartner?: BoolFilter<"HealthCenter"> | boolean
    createdAt?: DateTimeFilter<"HealthCenter"> | Date | string
    vouchers?: HealthVoucherListRelationFilter
  }

  export type HealthCenterOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    city?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    phone?: SortOrder
    priceInfo?: SortOrder
    isGirlFriendly?: SortOrder
    isPartner?: SortOrder
    createdAt?: SortOrder
    vouchers?: HealthVoucherOrderByRelationAggregateInput
  }

  export type HealthCenterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HealthCenterWhereInput | HealthCenterWhereInput[]
    OR?: HealthCenterWhereInput[]
    NOT?: HealthCenterWhereInput | HealthCenterWhereInput[]
    name?: StringFilter<"HealthCenter"> | string
    description?: StringFilter<"HealthCenter"> | string
    city?: StringFilter<"HealthCenter"> | string
    address?: StringFilter<"HealthCenter"> | string
    latitude?: FloatFilter<"HealthCenter"> | number
    longitude?: FloatFilter<"HealthCenter"> | number
    phone?: StringFilter<"HealthCenter"> | string
    priceInfo?: StringFilter<"HealthCenter"> | string
    isGirlFriendly?: BoolFilter<"HealthCenter"> | boolean
    isPartner?: BoolFilter<"HealthCenter"> | boolean
    createdAt?: DateTimeFilter<"HealthCenter"> | Date | string
    vouchers?: HealthVoucherListRelationFilter
  }, "id">

  export type HealthCenterOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    city?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    phone?: SortOrder
    priceInfo?: SortOrder
    isGirlFriendly?: SortOrder
    isPartner?: SortOrder
    createdAt?: SortOrder
    _count?: HealthCenterCountOrderByAggregateInput
    _avg?: HealthCenterAvgOrderByAggregateInput
    _max?: HealthCenterMaxOrderByAggregateInput
    _min?: HealthCenterMinOrderByAggregateInput
    _sum?: HealthCenterSumOrderByAggregateInput
  }

  export type HealthCenterScalarWhereWithAggregatesInput = {
    AND?: HealthCenterScalarWhereWithAggregatesInput | HealthCenterScalarWhereWithAggregatesInput[]
    OR?: HealthCenterScalarWhereWithAggregatesInput[]
    NOT?: HealthCenterScalarWhereWithAggregatesInput | HealthCenterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HealthCenter"> | string
    name?: StringWithAggregatesFilter<"HealthCenter"> | string
    description?: StringWithAggregatesFilter<"HealthCenter"> | string
    city?: StringWithAggregatesFilter<"HealthCenter"> | string
    address?: StringWithAggregatesFilter<"HealthCenter"> | string
    latitude?: FloatWithAggregatesFilter<"HealthCenter"> | number
    longitude?: FloatWithAggregatesFilter<"HealthCenter"> | number
    phone?: StringWithAggregatesFilter<"HealthCenter"> | string
    priceInfo?: StringWithAggregatesFilter<"HealthCenter"> | string
    isGirlFriendly?: BoolWithAggregatesFilter<"HealthCenter"> | boolean
    isPartner?: BoolWithAggregatesFilter<"HealthCenter"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"HealthCenter"> | Date | string
  }

  export type HealthVoucherWhereInput = {
    AND?: HealthVoucherWhereInput | HealthVoucherWhereInput[]
    OR?: HealthVoucherWhereInput[]
    NOT?: HealthVoucherWhereInput | HealthVoucherWhereInput[]
    id?: StringFilter<"HealthVoucher"> | string
    code?: StringFilter<"HealthVoucher"> | string
    anonId?: StringFilter<"HealthVoucher"> | string
    healthCenterId?: StringFilter<"HealthVoucher"> | string
    status?: StringFilter<"HealthVoucher"> | string
    expiresAt?: DateTimeFilter<"HealthVoucher"> | Date | string
    usedAt?: DateTimeNullableFilter<"HealthVoucher"> | Date | string | null
    qrData?: StringFilter<"HealthVoucher"> | string
    createdAt?: DateTimeFilter<"HealthVoucher"> | Date | string
    healthCenter?: XOR<HealthCenterScalarRelationFilter, HealthCenterWhereInput>
  }

  export type HealthVoucherOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    anonId?: SortOrder
    healthCenterId?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    qrData?: SortOrder
    createdAt?: SortOrder
    healthCenter?: HealthCenterOrderByWithRelationInput
  }

  export type HealthVoucherWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: HealthVoucherWhereInput | HealthVoucherWhereInput[]
    OR?: HealthVoucherWhereInput[]
    NOT?: HealthVoucherWhereInput | HealthVoucherWhereInput[]
    anonId?: StringFilter<"HealthVoucher"> | string
    healthCenterId?: StringFilter<"HealthVoucher"> | string
    status?: StringFilter<"HealthVoucher"> | string
    expiresAt?: DateTimeFilter<"HealthVoucher"> | Date | string
    usedAt?: DateTimeNullableFilter<"HealthVoucher"> | Date | string | null
    qrData?: StringFilter<"HealthVoucher"> | string
    createdAt?: DateTimeFilter<"HealthVoucher"> | Date | string
    healthCenter?: XOR<HealthCenterScalarRelationFilter, HealthCenterWhereInput>
  }, "id" | "code">

  export type HealthVoucherOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    anonId?: SortOrder
    healthCenterId?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    qrData?: SortOrder
    createdAt?: SortOrder
    _count?: HealthVoucherCountOrderByAggregateInput
    _max?: HealthVoucherMaxOrderByAggregateInput
    _min?: HealthVoucherMinOrderByAggregateInput
  }

  export type HealthVoucherScalarWhereWithAggregatesInput = {
    AND?: HealthVoucherScalarWhereWithAggregatesInput | HealthVoucherScalarWhereWithAggregatesInput[]
    OR?: HealthVoucherScalarWhereWithAggregatesInput[]
    NOT?: HealthVoucherScalarWhereWithAggregatesInput | HealthVoucherScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HealthVoucher"> | string
    code?: StringWithAggregatesFilter<"HealthVoucher"> | string
    anonId?: StringWithAggregatesFilter<"HealthVoucher"> | string
    healthCenterId?: StringWithAggregatesFilter<"HealthVoucher"> | string
    status?: StringWithAggregatesFilter<"HealthVoucher"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"HealthVoucher"> | Date | string
    usedAt?: DateTimeNullableWithAggregatesFilter<"HealthVoucher"> | Date | string | null
    qrData?: StringWithAggregatesFilter<"HealthVoucher"> | string
    createdAt?: DateTimeWithAggregatesFilter<"HealthVoucher"> | Date | string
  }

  export type CycleEntryCreateInput = {
    id?: string
    anonId: string
    startDate: Date | string
    endDate?: Date | string | null
    cycleLength?: number | null
    periodLength?: number | null
    flowIntensity?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CycleEntryUncheckedCreateInput = {
    id?: string
    anonId: string
    startDate: Date | string
    endDate?: Date | string | null
    cycleLength?: number | null
    periodLength?: number | null
    flowIntensity?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CycleEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cycleLength?: NullableIntFieldUpdateOperationsInput | number | null
    periodLength?: NullableIntFieldUpdateOperationsInput | number | null
    flowIntensity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CycleEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cycleLength?: NullableIntFieldUpdateOperationsInput | number | null
    periodLength?: NullableIntFieldUpdateOperationsInput | number | null
    flowIntensity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CycleEntryCreateManyInput = {
    id?: string
    anonId: string
    startDate: Date | string
    endDate?: Date | string | null
    cycleLength?: number | null
    periodLength?: number | null
    flowIntensity?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CycleEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cycleLength?: NullableIntFieldUpdateOperationsInput | number | null
    periodLength?: NullableIntFieldUpdateOperationsInput | number | null
    flowIntensity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CycleEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cycleLength?: NullableIntFieldUpdateOperationsInput | number | null
    periodLength?: NullableIntFieldUpdateOperationsInput | number | null
    flowIntensity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyLogCreateInput = {
    id?: string
    anonId: string
    date: Date | string
    mood?: string | null
    symptoms?: DailyLogCreatesymptomsInput | string[]
    encryptedNotes?: string | null
    notesIv?: string | null
    notesAuthTag?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyLogUncheckedCreateInput = {
    id?: string
    anonId: string
    date: Date | string
    mood?: string | null
    symptoms?: DailyLogCreatesymptomsInput | string[]
    encryptedNotes?: string | null
    notesIv?: string | null
    notesAuthTag?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    symptoms?: DailyLogUpdatesymptomsInput | string[]
    encryptedNotes?: NullableStringFieldUpdateOperationsInput | string | null
    notesIv?: NullableStringFieldUpdateOperationsInput | string | null
    notesAuthTag?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    symptoms?: DailyLogUpdatesymptomsInput | string[]
    encryptedNotes?: NullableStringFieldUpdateOperationsInput | string | null
    notesIv?: NullableStringFieldUpdateOperationsInput | string | null
    notesAuthTag?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyLogCreateManyInput = {
    id?: string
    anonId: string
    date: Date | string
    mood?: string | null
    symptoms?: DailyLogCreatesymptomsInput | string[]
    encryptedNotes?: string | null
    notesIv?: string | null
    notesAuthTag?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    symptoms?: DailyLogUpdatesymptomsInput | string[]
    encryptedNotes?: NullableStringFieldUpdateOperationsInput | string | null
    notesIv?: NullableStringFieldUpdateOperationsInput | string | null
    notesAuthTag?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    symptoms?: DailyLogUpdatesymptomsInput | string[]
    encryptedNotes?: NullableStringFieldUpdateOperationsInput | string | null
    notesIv?: NullableStringFieldUpdateOperationsInput | string | null
    notesAuthTag?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumPostCreateInput = {
    id?: string
    anonId: string
    title: string
    category: string
    content: string
    status?: string
    reportsCount?: number
    hugReactions?: number
    meTooReactions?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: ForumCommentCreateNestedManyWithoutPostInput
    reactions?: ForumReactionCreateNestedManyWithoutPostInput
  }

  export type ForumPostUncheckedCreateInput = {
    id?: string
    anonId: string
    title: string
    category: string
    content: string
    status?: string
    reportsCount?: number
    hugReactions?: number
    meTooReactions?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: ForumCommentUncheckedCreateNestedManyWithoutPostInput
    reactions?: ForumReactionUncheckedCreateNestedManyWithoutPostInput
  }

  export type ForumPostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reportsCount?: IntFieldUpdateOperationsInput | number
    hugReactions?: IntFieldUpdateOperationsInput | number
    meTooReactions?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: ForumCommentUpdateManyWithoutPostNestedInput
    reactions?: ForumReactionUpdateManyWithoutPostNestedInput
  }

  export type ForumPostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reportsCount?: IntFieldUpdateOperationsInput | number
    hugReactions?: IntFieldUpdateOperationsInput | number
    meTooReactions?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: ForumCommentUncheckedUpdateManyWithoutPostNestedInput
    reactions?: ForumReactionUncheckedUpdateManyWithoutPostNestedInput
  }

  export type ForumPostCreateManyInput = {
    id?: string
    anonId: string
    title: string
    category: string
    content: string
    status?: string
    reportsCount?: number
    hugReactions?: number
    meTooReactions?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ForumPostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reportsCount?: IntFieldUpdateOperationsInput | number
    hugReactions?: IntFieldUpdateOperationsInput | number
    meTooReactions?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumPostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reportsCount?: IntFieldUpdateOperationsInput | number
    hugReactions?: IntFieldUpdateOperationsInput | number
    meTooReactions?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumCommentCreateInput = {
    id?: string
    anonId: string
    content: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    post: ForumPostCreateNestedOneWithoutCommentsInput
  }

  export type ForumCommentUncheckedCreateInput = {
    id?: string
    postId: string
    anonId: string
    content: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ForumCommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: ForumPostUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type ForumCommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumCommentCreateManyInput = {
    id?: string
    postId: string
    anonId: string
    content: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ForumCommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumCommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumReactionCreateInput = {
    id?: string
    anonId: string
    reactionType: string
    createdAt?: Date | string
    post: ForumPostCreateNestedOneWithoutReactionsInput
  }

  export type ForumReactionUncheckedCreateInput = {
    id?: string
    postId: string
    anonId: string
    reactionType: string
    createdAt?: Date | string
  }

  export type ForumReactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    reactionType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: ForumPostUpdateOneRequiredWithoutReactionsNestedInput
  }

  export type ForumReactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    reactionType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumReactionCreateManyInput = {
    id?: string
    postId: string
    anonId: string
    reactionType: string
    createdAt?: Date | string
  }

  export type ForumReactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    reactionType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumReactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    reactionType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssistantMessageCreateInput = {
    id?: string
    anonId: string
    role: string
    encryptedContent: string
    iv: string
    authTag: string
    isCrisis?: boolean
    createdAt?: Date | string
  }

  export type AssistantMessageUncheckedCreateInput = {
    id?: string
    anonId: string
    role: string
    encryptedContent: string
    iv: string
    authTag: string
    isCrisis?: boolean
    createdAt?: Date | string
  }

  export type AssistantMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    encryptedContent?: StringFieldUpdateOperationsInput | string
    iv?: StringFieldUpdateOperationsInput | string
    authTag?: StringFieldUpdateOperationsInput | string
    isCrisis?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssistantMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    encryptedContent?: StringFieldUpdateOperationsInput | string
    iv?: StringFieldUpdateOperationsInput | string
    authTag?: StringFieldUpdateOperationsInput | string
    isCrisis?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssistantMessageCreateManyInput = {
    id?: string
    anonId: string
    role: string
    encryptedContent: string
    iv: string
    authTag: string
    isCrisis?: boolean
    createdAt?: Date | string
  }

  export type AssistantMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    encryptedContent?: StringFieldUpdateOperationsInput | string
    iv?: StringFieldUpdateOperationsInput | string
    authTag?: StringFieldUpdateOperationsInput | string
    isCrisis?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssistantMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    encryptedContent?: StringFieldUpdateOperationsInput | string
    iv?: StringFieldUpdateOperationsInput | string
    authTag?: StringFieldUpdateOperationsInput | string
    isCrisis?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthCenterCreateInput = {
    id?: string
    name: string
    description: string
    city: string
    address: string
    latitude: number
    longitude: number
    phone: string
    priceInfo: string
    isGirlFriendly?: boolean
    isPartner?: boolean
    createdAt?: Date | string
    vouchers?: HealthVoucherCreateNestedManyWithoutHealthCenterInput
  }

  export type HealthCenterUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    city: string
    address: string
    latitude: number
    longitude: number
    phone: string
    priceInfo: string
    isGirlFriendly?: boolean
    isPartner?: boolean
    createdAt?: Date | string
    vouchers?: HealthVoucherUncheckedCreateNestedManyWithoutHealthCenterInput
  }

  export type HealthCenterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: StringFieldUpdateOperationsInput | string
    priceInfo?: StringFieldUpdateOperationsInput | string
    isGirlFriendly?: BoolFieldUpdateOperationsInput | boolean
    isPartner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vouchers?: HealthVoucherUpdateManyWithoutHealthCenterNestedInput
  }

  export type HealthCenterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: StringFieldUpdateOperationsInput | string
    priceInfo?: StringFieldUpdateOperationsInput | string
    isGirlFriendly?: BoolFieldUpdateOperationsInput | boolean
    isPartner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vouchers?: HealthVoucherUncheckedUpdateManyWithoutHealthCenterNestedInput
  }

  export type HealthCenterCreateManyInput = {
    id?: string
    name: string
    description: string
    city: string
    address: string
    latitude: number
    longitude: number
    phone: string
    priceInfo: string
    isGirlFriendly?: boolean
    isPartner?: boolean
    createdAt?: Date | string
  }

  export type HealthCenterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: StringFieldUpdateOperationsInput | string
    priceInfo?: StringFieldUpdateOperationsInput | string
    isGirlFriendly?: BoolFieldUpdateOperationsInput | boolean
    isPartner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthCenterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: StringFieldUpdateOperationsInput | string
    priceInfo?: StringFieldUpdateOperationsInput | string
    isGirlFriendly?: BoolFieldUpdateOperationsInput | boolean
    isPartner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthVoucherCreateInput = {
    id?: string
    code: string
    anonId: string
    status?: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    qrData: string
    createdAt?: Date | string
    healthCenter: HealthCenterCreateNestedOneWithoutVouchersInput
  }

  export type HealthVoucherUncheckedCreateInput = {
    id?: string
    code: string
    anonId: string
    healthCenterId: string
    status?: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    qrData: string
    createdAt?: Date | string
  }

  export type HealthVoucherUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrData?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthCenter?: HealthCenterUpdateOneRequiredWithoutVouchersNestedInput
  }

  export type HealthVoucherUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    healthCenterId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrData?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthVoucherCreateManyInput = {
    id?: string
    code: string
    anonId: string
    healthCenterId: string
    status?: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    qrData: string
    createdAt?: Date | string
  }

  export type HealthVoucherUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrData?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthVoucherUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    healthCenterId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrData?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CycleEntryCountOrderByAggregateInput = {
    id?: SortOrder
    anonId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    cycleLength?: SortOrder
    periodLength?: SortOrder
    flowIntensity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CycleEntryAvgOrderByAggregateInput = {
    cycleLength?: SortOrder
    periodLength?: SortOrder
  }

  export type CycleEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    anonId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    cycleLength?: SortOrder
    periodLength?: SortOrder
    flowIntensity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CycleEntryMinOrderByAggregateInput = {
    id?: SortOrder
    anonId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    cycleLength?: SortOrder
    periodLength?: SortOrder
    flowIntensity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CycleEntrySumOrderByAggregateInput = {
    cycleLength?: SortOrder
    periodLength?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DailyLogAnonIdDateCompoundUniqueInput = {
    anonId: string
    date: Date | string
  }

  export type DailyLogCountOrderByAggregateInput = {
    id?: SortOrder
    anonId?: SortOrder
    date?: SortOrder
    mood?: SortOrder
    symptoms?: SortOrder
    encryptedNotes?: SortOrder
    notesIv?: SortOrder
    notesAuthTag?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyLogMaxOrderByAggregateInput = {
    id?: SortOrder
    anonId?: SortOrder
    date?: SortOrder
    mood?: SortOrder
    encryptedNotes?: SortOrder
    notesIv?: SortOrder
    notesAuthTag?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyLogMinOrderByAggregateInput = {
    id?: SortOrder
    anonId?: SortOrder
    date?: SortOrder
    mood?: SortOrder
    encryptedNotes?: SortOrder
    notesIv?: SortOrder
    notesAuthTag?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ForumCommentListRelationFilter = {
    every?: ForumCommentWhereInput
    some?: ForumCommentWhereInput
    none?: ForumCommentWhereInput
  }

  export type ForumReactionListRelationFilter = {
    every?: ForumReactionWhereInput
    some?: ForumReactionWhereInput
    none?: ForumReactionWhereInput
  }

  export type ForumCommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ForumReactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ForumPostCountOrderByAggregateInput = {
    id?: SortOrder
    anonId?: SortOrder
    title?: SortOrder
    category?: SortOrder
    content?: SortOrder
    status?: SortOrder
    reportsCount?: SortOrder
    hugReactions?: SortOrder
    meTooReactions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ForumPostAvgOrderByAggregateInput = {
    reportsCount?: SortOrder
    hugReactions?: SortOrder
    meTooReactions?: SortOrder
  }

  export type ForumPostMaxOrderByAggregateInput = {
    id?: SortOrder
    anonId?: SortOrder
    title?: SortOrder
    category?: SortOrder
    content?: SortOrder
    status?: SortOrder
    reportsCount?: SortOrder
    hugReactions?: SortOrder
    meTooReactions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ForumPostMinOrderByAggregateInput = {
    id?: SortOrder
    anonId?: SortOrder
    title?: SortOrder
    category?: SortOrder
    content?: SortOrder
    status?: SortOrder
    reportsCount?: SortOrder
    hugReactions?: SortOrder
    meTooReactions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ForumPostSumOrderByAggregateInput = {
    reportsCount?: SortOrder
    hugReactions?: SortOrder
    meTooReactions?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ForumPostScalarRelationFilter = {
    is?: ForumPostWhereInput
    isNot?: ForumPostWhereInput
  }

  export type ForumCommentCountOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    anonId?: SortOrder
    content?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ForumCommentMaxOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    anonId?: SortOrder
    content?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ForumCommentMinOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    anonId?: SortOrder
    content?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ForumReactionPostIdAnonIdReactionTypeCompoundUniqueInput = {
    postId: string
    anonId: string
    reactionType: string
  }

  export type ForumReactionCountOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    anonId?: SortOrder
    reactionType?: SortOrder
    createdAt?: SortOrder
  }

  export type ForumReactionMaxOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    anonId?: SortOrder
    reactionType?: SortOrder
    createdAt?: SortOrder
  }

  export type ForumReactionMinOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    anonId?: SortOrder
    reactionType?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AssistantMessageCountOrderByAggregateInput = {
    id?: SortOrder
    anonId?: SortOrder
    role?: SortOrder
    encryptedContent?: SortOrder
    iv?: SortOrder
    authTag?: SortOrder
    isCrisis?: SortOrder
    createdAt?: SortOrder
  }

  export type AssistantMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    anonId?: SortOrder
    role?: SortOrder
    encryptedContent?: SortOrder
    iv?: SortOrder
    authTag?: SortOrder
    isCrisis?: SortOrder
    createdAt?: SortOrder
  }

  export type AssistantMessageMinOrderByAggregateInput = {
    id?: SortOrder
    anonId?: SortOrder
    role?: SortOrder
    encryptedContent?: SortOrder
    iv?: SortOrder
    authTag?: SortOrder
    isCrisis?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type HealthVoucherListRelationFilter = {
    every?: HealthVoucherWhereInput
    some?: HealthVoucherWhereInput
    none?: HealthVoucherWhereInput
  }

  export type HealthVoucherOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HealthCenterCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    city?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    phone?: SortOrder
    priceInfo?: SortOrder
    isGirlFriendly?: SortOrder
    isPartner?: SortOrder
    createdAt?: SortOrder
  }

  export type HealthCenterAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type HealthCenterMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    city?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    phone?: SortOrder
    priceInfo?: SortOrder
    isGirlFriendly?: SortOrder
    isPartner?: SortOrder
    createdAt?: SortOrder
  }

  export type HealthCenterMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    city?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    phone?: SortOrder
    priceInfo?: SortOrder
    isGirlFriendly?: SortOrder
    isPartner?: SortOrder
    createdAt?: SortOrder
  }

  export type HealthCenterSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type HealthCenterScalarRelationFilter = {
    is?: HealthCenterWhereInput
    isNot?: HealthCenterWhereInput
  }

  export type HealthVoucherCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    anonId?: SortOrder
    healthCenterId?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    qrData?: SortOrder
    createdAt?: SortOrder
  }

  export type HealthVoucherMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    anonId?: SortOrder
    healthCenterId?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    qrData?: SortOrder
    createdAt?: SortOrder
  }

  export type HealthVoucherMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    anonId?: SortOrder
    healthCenterId?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    qrData?: SortOrder
    createdAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DailyLogCreatesymptomsInput = {
    set: string[]
  }

  export type DailyLogUpdatesymptomsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ForumCommentCreateNestedManyWithoutPostInput = {
    create?: XOR<ForumCommentCreateWithoutPostInput, ForumCommentUncheckedCreateWithoutPostInput> | ForumCommentCreateWithoutPostInput[] | ForumCommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: ForumCommentCreateOrConnectWithoutPostInput | ForumCommentCreateOrConnectWithoutPostInput[]
    createMany?: ForumCommentCreateManyPostInputEnvelope
    connect?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
  }

  export type ForumReactionCreateNestedManyWithoutPostInput = {
    create?: XOR<ForumReactionCreateWithoutPostInput, ForumReactionUncheckedCreateWithoutPostInput> | ForumReactionCreateWithoutPostInput[] | ForumReactionUncheckedCreateWithoutPostInput[]
    connectOrCreate?: ForumReactionCreateOrConnectWithoutPostInput | ForumReactionCreateOrConnectWithoutPostInput[]
    createMany?: ForumReactionCreateManyPostInputEnvelope
    connect?: ForumReactionWhereUniqueInput | ForumReactionWhereUniqueInput[]
  }

  export type ForumCommentUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<ForumCommentCreateWithoutPostInput, ForumCommentUncheckedCreateWithoutPostInput> | ForumCommentCreateWithoutPostInput[] | ForumCommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: ForumCommentCreateOrConnectWithoutPostInput | ForumCommentCreateOrConnectWithoutPostInput[]
    createMany?: ForumCommentCreateManyPostInputEnvelope
    connect?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
  }

  export type ForumReactionUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<ForumReactionCreateWithoutPostInput, ForumReactionUncheckedCreateWithoutPostInput> | ForumReactionCreateWithoutPostInput[] | ForumReactionUncheckedCreateWithoutPostInput[]
    connectOrCreate?: ForumReactionCreateOrConnectWithoutPostInput | ForumReactionCreateOrConnectWithoutPostInput[]
    createMany?: ForumReactionCreateManyPostInputEnvelope
    connect?: ForumReactionWhereUniqueInput | ForumReactionWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ForumCommentUpdateManyWithoutPostNestedInput = {
    create?: XOR<ForumCommentCreateWithoutPostInput, ForumCommentUncheckedCreateWithoutPostInput> | ForumCommentCreateWithoutPostInput[] | ForumCommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: ForumCommentCreateOrConnectWithoutPostInput | ForumCommentCreateOrConnectWithoutPostInput[]
    upsert?: ForumCommentUpsertWithWhereUniqueWithoutPostInput | ForumCommentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: ForumCommentCreateManyPostInputEnvelope
    set?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    disconnect?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    delete?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    connect?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    update?: ForumCommentUpdateWithWhereUniqueWithoutPostInput | ForumCommentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: ForumCommentUpdateManyWithWhereWithoutPostInput | ForumCommentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: ForumCommentScalarWhereInput | ForumCommentScalarWhereInput[]
  }

  export type ForumReactionUpdateManyWithoutPostNestedInput = {
    create?: XOR<ForumReactionCreateWithoutPostInput, ForumReactionUncheckedCreateWithoutPostInput> | ForumReactionCreateWithoutPostInput[] | ForumReactionUncheckedCreateWithoutPostInput[]
    connectOrCreate?: ForumReactionCreateOrConnectWithoutPostInput | ForumReactionCreateOrConnectWithoutPostInput[]
    upsert?: ForumReactionUpsertWithWhereUniqueWithoutPostInput | ForumReactionUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: ForumReactionCreateManyPostInputEnvelope
    set?: ForumReactionWhereUniqueInput | ForumReactionWhereUniqueInput[]
    disconnect?: ForumReactionWhereUniqueInput | ForumReactionWhereUniqueInput[]
    delete?: ForumReactionWhereUniqueInput | ForumReactionWhereUniqueInput[]
    connect?: ForumReactionWhereUniqueInput | ForumReactionWhereUniqueInput[]
    update?: ForumReactionUpdateWithWhereUniqueWithoutPostInput | ForumReactionUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: ForumReactionUpdateManyWithWhereWithoutPostInput | ForumReactionUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: ForumReactionScalarWhereInput | ForumReactionScalarWhereInput[]
  }

  export type ForumCommentUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<ForumCommentCreateWithoutPostInput, ForumCommentUncheckedCreateWithoutPostInput> | ForumCommentCreateWithoutPostInput[] | ForumCommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: ForumCommentCreateOrConnectWithoutPostInput | ForumCommentCreateOrConnectWithoutPostInput[]
    upsert?: ForumCommentUpsertWithWhereUniqueWithoutPostInput | ForumCommentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: ForumCommentCreateManyPostInputEnvelope
    set?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    disconnect?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    delete?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    connect?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    update?: ForumCommentUpdateWithWhereUniqueWithoutPostInput | ForumCommentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: ForumCommentUpdateManyWithWhereWithoutPostInput | ForumCommentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: ForumCommentScalarWhereInput | ForumCommentScalarWhereInput[]
  }

  export type ForumReactionUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<ForumReactionCreateWithoutPostInput, ForumReactionUncheckedCreateWithoutPostInput> | ForumReactionCreateWithoutPostInput[] | ForumReactionUncheckedCreateWithoutPostInput[]
    connectOrCreate?: ForumReactionCreateOrConnectWithoutPostInput | ForumReactionCreateOrConnectWithoutPostInput[]
    upsert?: ForumReactionUpsertWithWhereUniqueWithoutPostInput | ForumReactionUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: ForumReactionCreateManyPostInputEnvelope
    set?: ForumReactionWhereUniqueInput | ForumReactionWhereUniqueInput[]
    disconnect?: ForumReactionWhereUniqueInput | ForumReactionWhereUniqueInput[]
    delete?: ForumReactionWhereUniqueInput | ForumReactionWhereUniqueInput[]
    connect?: ForumReactionWhereUniqueInput | ForumReactionWhereUniqueInput[]
    update?: ForumReactionUpdateWithWhereUniqueWithoutPostInput | ForumReactionUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: ForumReactionUpdateManyWithWhereWithoutPostInput | ForumReactionUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: ForumReactionScalarWhereInput | ForumReactionScalarWhereInput[]
  }

  export type ForumPostCreateNestedOneWithoutCommentsInput = {
    create?: XOR<ForumPostCreateWithoutCommentsInput, ForumPostUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: ForumPostCreateOrConnectWithoutCommentsInput
    connect?: ForumPostWhereUniqueInput
  }

  export type ForumPostUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<ForumPostCreateWithoutCommentsInput, ForumPostUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: ForumPostCreateOrConnectWithoutCommentsInput
    upsert?: ForumPostUpsertWithoutCommentsInput
    connect?: ForumPostWhereUniqueInput
    update?: XOR<XOR<ForumPostUpdateToOneWithWhereWithoutCommentsInput, ForumPostUpdateWithoutCommentsInput>, ForumPostUncheckedUpdateWithoutCommentsInput>
  }

  export type ForumPostCreateNestedOneWithoutReactionsInput = {
    create?: XOR<ForumPostCreateWithoutReactionsInput, ForumPostUncheckedCreateWithoutReactionsInput>
    connectOrCreate?: ForumPostCreateOrConnectWithoutReactionsInput
    connect?: ForumPostWhereUniqueInput
  }

  export type ForumPostUpdateOneRequiredWithoutReactionsNestedInput = {
    create?: XOR<ForumPostCreateWithoutReactionsInput, ForumPostUncheckedCreateWithoutReactionsInput>
    connectOrCreate?: ForumPostCreateOrConnectWithoutReactionsInput
    upsert?: ForumPostUpsertWithoutReactionsInput
    connect?: ForumPostWhereUniqueInput
    update?: XOR<XOR<ForumPostUpdateToOneWithWhereWithoutReactionsInput, ForumPostUpdateWithoutReactionsInput>, ForumPostUncheckedUpdateWithoutReactionsInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type HealthVoucherCreateNestedManyWithoutHealthCenterInput = {
    create?: XOR<HealthVoucherCreateWithoutHealthCenterInput, HealthVoucherUncheckedCreateWithoutHealthCenterInput> | HealthVoucherCreateWithoutHealthCenterInput[] | HealthVoucherUncheckedCreateWithoutHealthCenterInput[]
    connectOrCreate?: HealthVoucherCreateOrConnectWithoutHealthCenterInput | HealthVoucherCreateOrConnectWithoutHealthCenterInput[]
    createMany?: HealthVoucherCreateManyHealthCenterInputEnvelope
    connect?: HealthVoucherWhereUniqueInput | HealthVoucherWhereUniqueInput[]
  }

  export type HealthVoucherUncheckedCreateNestedManyWithoutHealthCenterInput = {
    create?: XOR<HealthVoucherCreateWithoutHealthCenterInput, HealthVoucherUncheckedCreateWithoutHealthCenterInput> | HealthVoucherCreateWithoutHealthCenterInput[] | HealthVoucherUncheckedCreateWithoutHealthCenterInput[]
    connectOrCreate?: HealthVoucherCreateOrConnectWithoutHealthCenterInput | HealthVoucherCreateOrConnectWithoutHealthCenterInput[]
    createMany?: HealthVoucherCreateManyHealthCenterInputEnvelope
    connect?: HealthVoucherWhereUniqueInput | HealthVoucherWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type HealthVoucherUpdateManyWithoutHealthCenterNestedInput = {
    create?: XOR<HealthVoucherCreateWithoutHealthCenterInput, HealthVoucherUncheckedCreateWithoutHealthCenterInput> | HealthVoucherCreateWithoutHealthCenterInput[] | HealthVoucherUncheckedCreateWithoutHealthCenterInput[]
    connectOrCreate?: HealthVoucherCreateOrConnectWithoutHealthCenterInput | HealthVoucherCreateOrConnectWithoutHealthCenterInput[]
    upsert?: HealthVoucherUpsertWithWhereUniqueWithoutHealthCenterInput | HealthVoucherUpsertWithWhereUniqueWithoutHealthCenterInput[]
    createMany?: HealthVoucherCreateManyHealthCenterInputEnvelope
    set?: HealthVoucherWhereUniqueInput | HealthVoucherWhereUniqueInput[]
    disconnect?: HealthVoucherWhereUniqueInput | HealthVoucherWhereUniqueInput[]
    delete?: HealthVoucherWhereUniqueInput | HealthVoucherWhereUniqueInput[]
    connect?: HealthVoucherWhereUniqueInput | HealthVoucherWhereUniqueInput[]
    update?: HealthVoucherUpdateWithWhereUniqueWithoutHealthCenterInput | HealthVoucherUpdateWithWhereUniqueWithoutHealthCenterInput[]
    updateMany?: HealthVoucherUpdateManyWithWhereWithoutHealthCenterInput | HealthVoucherUpdateManyWithWhereWithoutHealthCenterInput[]
    deleteMany?: HealthVoucherScalarWhereInput | HealthVoucherScalarWhereInput[]
  }

  export type HealthVoucherUncheckedUpdateManyWithoutHealthCenterNestedInput = {
    create?: XOR<HealthVoucherCreateWithoutHealthCenterInput, HealthVoucherUncheckedCreateWithoutHealthCenterInput> | HealthVoucherCreateWithoutHealthCenterInput[] | HealthVoucherUncheckedCreateWithoutHealthCenterInput[]
    connectOrCreate?: HealthVoucherCreateOrConnectWithoutHealthCenterInput | HealthVoucherCreateOrConnectWithoutHealthCenterInput[]
    upsert?: HealthVoucherUpsertWithWhereUniqueWithoutHealthCenterInput | HealthVoucherUpsertWithWhereUniqueWithoutHealthCenterInput[]
    createMany?: HealthVoucherCreateManyHealthCenterInputEnvelope
    set?: HealthVoucherWhereUniqueInput | HealthVoucherWhereUniqueInput[]
    disconnect?: HealthVoucherWhereUniqueInput | HealthVoucherWhereUniqueInput[]
    delete?: HealthVoucherWhereUniqueInput | HealthVoucherWhereUniqueInput[]
    connect?: HealthVoucherWhereUniqueInput | HealthVoucherWhereUniqueInput[]
    update?: HealthVoucherUpdateWithWhereUniqueWithoutHealthCenterInput | HealthVoucherUpdateWithWhereUniqueWithoutHealthCenterInput[]
    updateMany?: HealthVoucherUpdateManyWithWhereWithoutHealthCenterInput | HealthVoucherUpdateManyWithWhereWithoutHealthCenterInput[]
    deleteMany?: HealthVoucherScalarWhereInput | HealthVoucherScalarWhereInput[]
  }

  export type HealthCenterCreateNestedOneWithoutVouchersInput = {
    create?: XOR<HealthCenterCreateWithoutVouchersInput, HealthCenterUncheckedCreateWithoutVouchersInput>
    connectOrCreate?: HealthCenterCreateOrConnectWithoutVouchersInput
    connect?: HealthCenterWhereUniqueInput
  }

  export type HealthCenterUpdateOneRequiredWithoutVouchersNestedInput = {
    create?: XOR<HealthCenterCreateWithoutVouchersInput, HealthCenterUncheckedCreateWithoutVouchersInput>
    connectOrCreate?: HealthCenterCreateOrConnectWithoutVouchersInput
    upsert?: HealthCenterUpsertWithoutVouchersInput
    connect?: HealthCenterWhereUniqueInput
    update?: XOR<XOR<HealthCenterUpdateToOneWithWhereWithoutVouchersInput, HealthCenterUpdateWithoutVouchersInput>, HealthCenterUncheckedUpdateWithoutVouchersInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type ForumCommentCreateWithoutPostInput = {
    id?: string
    anonId: string
    content: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ForumCommentUncheckedCreateWithoutPostInput = {
    id?: string
    anonId: string
    content: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ForumCommentCreateOrConnectWithoutPostInput = {
    where: ForumCommentWhereUniqueInput
    create: XOR<ForumCommentCreateWithoutPostInput, ForumCommentUncheckedCreateWithoutPostInput>
  }

  export type ForumCommentCreateManyPostInputEnvelope = {
    data: ForumCommentCreateManyPostInput | ForumCommentCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type ForumReactionCreateWithoutPostInput = {
    id?: string
    anonId: string
    reactionType: string
    createdAt?: Date | string
  }

  export type ForumReactionUncheckedCreateWithoutPostInput = {
    id?: string
    anonId: string
    reactionType: string
    createdAt?: Date | string
  }

  export type ForumReactionCreateOrConnectWithoutPostInput = {
    where: ForumReactionWhereUniqueInput
    create: XOR<ForumReactionCreateWithoutPostInput, ForumReactionUncheckedCreateWithoutPostInput>
  }

  export type ForumReactionCreateManyPostInputEnvelope = {
    data: ForumReactionCreateManyPostInput | ForumReactionCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type ForumCommentUpsertWithWhereUniqueWithoutPostInput = {
    where: ForumCommentWhereUniqueInput
    update: XOR<ForumCommentUpdateWithoutPostInput, ForumCommentUncheckedUpdateWithoutPostInput>
    create: XOR<ForumCommentCreateWithoutPostInput, ForumCommentUncheckedCreateWithoutPostInput>
  }

  export type ForumCommentUpdateWithWhereUniqueWithoutPostInput = {
    where: ForumCommentWhereUniqueInput
    data: XOR<ForumCommentUpdateWithoutPostInput, ForumCommentUncheckedUpdateWithoutPostInput>
  }

  export type ForumCommentUpdateManyWithWhereWithoutPostInput = {
    where: ForumCommentScalarWhereInput
    data: XOR<ForumCommentUpdateManyMutationInput, ForumCommentUncheckedUpdateManyWithoutPostInput>
  }

  export type ForumCommentScalarWhereInput = {
    AND?: ForumCommentScalarWhereInput | ForumCommentScalarWhereInput[]
    OR?: ForumCommentScalarWhereInput[]
    NOT?: ForumCommentScalarWhereInput | ForumCommentScalarWhereInput[]
    id?: StringFilter<"ForumComment"> | string
    postId?: StringFilter<"ForumComment"> | string
    anonId?: StringFilter<"ForumComment"> | string
    content?: StringFilter<"ForumComment"> | string
    status?: StringFilter<"ForumComment"> | string
    createdAt?: DateTimeFilter<"ForumComment"> | Date | string
    updatedAt?: DateTimeFilter<"ForumComment"> | Date | string
  }

  export type ForumReactionUpsertWithWhereUniqueWithoutPostInput = {
    where: ForumReactionWhereUniqueInput
    update: XOR<ForumReactionUpdateWithoutPostInput, ForumReactionUncheckedUpdateWithoutPostInput>
    create: XOR<ForumReactionCreateWithoutPostInput, ForumReactionUncheckedCreateWithoutPostInput>
  }

  export type ForumReactionUpdateWithWhereUniqueWithoutPostInput = {
    where: ForumReactionWhereUniqueInput
    data: XOR<ForumReactionUpdateWithoutPostInput, ForumReactionUncheckedUpdateWithoutPostInput>
  }

  export type ForumReactionUpdateManyWithWhereWithoutPostInput = {
    where: ForumReactionScalarWhereInput
    data: XOR<ForumReactionUpdateManyMutationInput, ForumReactionUncheckedUpdateManyWithoutPostInput>
  }

  export type ForumReactionScalarWhereInput = {
    AND?: ForumReactionScalarWhereInput | ForumReactionScalarWhereInput[]
    OR?: ForumReactionScalarWhereInput[]
    NOT?: ForumReactionScalarWhereInput | ForumReactionScalarWhereInput[]
    id?: StringFilter<"ForumReaction"> | string
    postId?: StringFilter<"ForumReaction"> | string
    anonId?: StringFilter<"ForumReaction"> | string
    reactionType?: StringFilter<"ForumReaction"> | string
    createdAt?: DateTimeFilter<"ForumReaction"> | Date | string
  }

  export type ForumPostCreateWithoutCommentsInput = {
    id?: string
    anonId: string
    title: string
    category: string
    content: string
    status?: string
    reportsCount?: number
    hugReactions?: number
    meTooReactions?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    reactions?: ForumReactionCreateNestedManyWithoutPostInput
  }

  export type ForumPostUncheckedCreateWithoutCommentsInput = {
    id?: string
    anonId: string
    title: string
    category: string
    content: string
    status?: string
    reportsCount?: number
    hugReactions?: number
    meTooReactions?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    reactions?: ForumReactionUncheckedCreateNestedManyWithoutPostInput
  }

  export type ForumPostCreateOrConnectWithoutCommentsInput = {
    where: ForumPostWhereUniqueInput
    create: XOR<ForumPostCreateWithoutCommentsInput, ForumPostUncheckedCreateWithoutCommentsInput>
  }

  export type ForumPostUpsertWithoutCommentsInput = {
    update: XOR<ForumPostUpdateWithoutCommentsInput, ForumPostUncheckedUpdateWithoutCommentsInput>
    create: XOR<ForumPostCreateWithoutCommentsInput, ForumPostUncheckedCreateWithoutCommentsInput>
    where?: ForumPostWhereInput
  }

  export type ForumPostUpdateToOneWithWhereWithoutCommentsInput = {
    where?: ForumPostWhereInput
    data: XOR<ForumPostUpdateWithoutCommentsInput, ForumPostUncheckedUpdateWithoutCommentsInput>
  }

  export type ForumPostUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reportsCount?: IntFieldUpdateOperationsInput | number
    hugReactions?: IntFieldUpdateOperationsInput | number
    meTooReactions?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reactions?: ForumReactionUpdateManyWithoutPostNestedInput
  }

  export type ForumPostUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reportsCount?: IntFieldUpdateOperationsInput | number
    hugReactions?: IntFieldUpdateOperationsInput | number
    meTooReactions?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reactions?: ForumReactionUncheckedUpdateManyWithoutPostNestedInput
  }

  export type ForumPostCreateWithoutReactionsInput = {
    id?: string
    anonId: string
    title: string
    category: string
    content: string
    status?: string
    reportsCount?: number
    hugReactions?: number
    meTooReactions?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: ForumCommentCreateNestedManyWithoutPostInput
  }

  export type ForumPostUncheckedCreateWithoutReactionsInput = {
    id?: string
    anonId: string
    title: string
    category: string
    content: string
    status?: string
    reportsCount?: number
    hugReactions?: number
    meTooReactions?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: ForumCommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type ForumPostCreateOrConnectWithoutReactionsInput = {
    where: ForumPostWhereUniqueInput
    create: XOR<ForumPostCreateWithoutReactionsInput, ForumPostUncheckedCreateWithoutReactionsInput>
  }

  export type ForumPostUpsertWithoutReactionsInput = {
    update: XOR<ForumPostUpdateWithoutReactionsInput, ForumPostUncheckedUpdateWithoutReactionsInput>
    create: XOR<ForumPostCreateWithoutReactionsInput, ForumPostUncheckedCreateWithoutReactionsInput>
    where?: ForumPostWhereInput
  }

  export type ForumPostUpdateToOneWithWhereWithoutReactionsInput = {
    where?: ForumPostWhereInput
    data: XOR<ForumPostUpdateWithoutReactionsInput, ForumPostUncheckedUpdateWithoutReactionsInput>
  }

  export type ForumPostUpdateWithoutReactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reportsCount?: IntFieldUpdateOperationsInput | number
    hugReactions?: IntFieldUpdateOperationsInput | number
    meTooReactions?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: ForumCommentUpdateManyWithoutPostNestedInput
  }

  export type ForumPostUncheckedUpdateWithoutReactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reportsCount?: IntFieldUpdateOperationsInput | number
    hugReactions?: IntFieldUpdateOperationsInput | number
    meTooReactions?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: ForumCommentUncheckedUpdateManyWithoutPostNestedInput
  }

  export type HealthVoucherCreateWithoutHealthCenterInput = {
    id?: string
    code: string
    anonId: string
    status?: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    qrData: string
    createdAt?: Date | string
  }

  export type HealthVoucherUncheckedCreateWithoutHealthCenterInput = {
    id?: string
    code: string
    anonId: string
    status?: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    qrData: string
    createdAt?: Date | string
  }

  export type HealthVoucherCreateOrConnectWithoutHealthCenterInput = {
    where: HealthVoucherWhereUniqueInput
    create: XOR<HealthVoucherCreateWithoutHealthCenterInput, HealthVoucherUncheckedCreateWithoutHealthCenterInput>
  }

  export type HealthVoucherCreateManyHealthCenterInputEnvelope = {
    data: HealthVoucherCreateManyHealthCenterInput | HealthVoucherCreateManyHealthCenterInput[]
    skipDuplicates?: boolean
  }

  export type HealthVoucherUpsertWithWhereUniqueWithoutHealthCenterInput = {
    where: HealthVoucherWhereUniqueInput
    update: XOR<HealthVoucherUpdateWithoutHealthCenterInput, HealthVoucherUncheckedUpdateWithoutHealthCenterInput>
    create: XOR<HealthVoucherCreateWithoutHealthCenterInput, HealthVoucherUncheckedCreateWithoutHealthCenterInput>
  }

  export type HealthVoucherUpdateWithWhereUniqueWithoutHealthCenterInput = {
    where: HealthVoucherWhereUniqueInput
    data: XOR<HealthVoucherUpdateWithoutHealthCenterInput, HealthVoucherUncheckedUpdateWithoutHealthCenterInput>
  }

  export type HealthVoucherUpdateManyWithWhereWithoutHealthCenterInput = {
    where: HealthVoucherScalarWhereInput
    data: XOR<HealthVoucherUpdateManyMutationInput, HealthVoucherUncheckedUpdateManyWithoutHealthCenterInput>
  }

  export type HealthVoucherScalarWhereInput = {
    AND?: HealthVoucherScalarWhereInput | HealthVoucherScalarWhereInput[]
    OR?: HealthVoucherScalarWhereInput[]
    NOT?: HealthVoucherScalarWhereInput | HealthVoucherScalarWhereInput[]
    id?: StringFilter<"HealthVoucher"> | string
    code?: StringFilter<"HealthVoucher"> | string
    anonId?: StringFilter<"HealthVoucher"> | string
    healthCenterId?: StringFilter<"HealthVoucher"> | string
    status?: StringFilter<"HealthVoucher"> | string
    expiresAt?: DateTimeFilter<"HealthVoucher"> | Date | string
    usedAt?: DateTimeNullableFilter<"HealthVoucher"> | Date | string | null
    qrData?: StringFilter<"HealthVoucher"> | string
    createdAt?: DateTimeFilter<"HealthVoucher"> | Date | string
  }

  export type HealthCenterCreateWithoutVouchersInput = {
    id?: string
    name: string
    description: string
    city: string
    address: string
    latitude: number
    longitude: number
    phone: string
    priceInfo: string
    isGirlFriendly?: boolean
    isPartner?: boolean
    createdAt?: Date | string
  }

  export type HealthCenterUncheckedCreateWithoutVouchersInput = {
    id?: string
    name: string
    description: string
    city: string
    address: string
    latitude: number
    longitude: number
    phone: string
    priceInfo: string
    isGirlFriendly?: boolean
    isPartner?: boolean
    createdAt?: Date | string
  }

  export type HealthCenterCreateOrConnectWithoutVouchersInput = {
    where: HealthCenterWhereUniqueInput
    create: XOR<HealthCenterCreateWithoutVouchersInput, HealthCenterUncheckedCreateWithoutVouchersInput>
  }

  export type HealthCenterUpsertWithoutVouchersInput = {
    update: XOR<HealthCenterUpdateWithoutVouchersInput, HealthCenterUncheckedUpdateWithoutVouchersInput>
    create: XOR<HealthCenterCreateWithoutVouchersInput, HealthCenterUncheckedCreateWithoutVouchersInput>
    where?: HealthCenterWhereInput
  }

  export type HealthCenterUpdateToOneWithWhereWithoutVouchersInput = {
    where?: HealthCenterWhereInput
    data: XOR<HealthCenterUpdateWithoutVouchersInput, HealthCenterUncheckedUpdateWithoutVouchersInput>
  }

  export type HealthCenterUpdateWithoutVouchersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: StringFieldUpdateOperationsInput | string
    priceInfo?: StringFieldUpdateOperationsInput | string
    isGirlFriendly?: BoolFieldUpdateOperationsInput | boolean
    isPartner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthCenterUncheckedUpdateWithoutVouchersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: StringFieldUpdateOperationsInput | string
    priceInfo?: StringFieldUpdateOperationsInput | string
    isGirlFriendly?: BoolFieldUpdateOperationsInput | boolean
    isPartner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumCommentCreateManyPostInput = {
    id?: string
    anonId: string
    content: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ForumReactionCreateManyPostInput = {
    id?: string
    anonId: string
    reactionType: string
    createdAt?: Date | string
  }

  export type ForumCommentUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumCommentUncheckedUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumCommentUncheckedUpdateManyWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumReactionUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    reactionType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumReactionUncheckedUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    reactionType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumReactionUncheckedUpdateManyWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    reactionType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthVoucherCreateManyHealthCenterInput = {
    id?: string
    code: string
    anonId: string
    status?: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    qrData: string
    createdAt?: Date | string
  }

  export type HealthVoucherUpdateWithoutHealthCenterInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrData?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthVoucherUncheckedUpdateWithoutHealthCenterInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrData?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthVoucherUncheckedUpdateManyWithoutHealthCenterInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    anonId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qrData?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}