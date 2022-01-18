/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { PlayIcon } from '@heroicons/react/solid';
import { Github, Stripe, Twitter } from '@icons-pack/react-simple-icons';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { classNames } from '../lib/class-names';
import ThemeSwitch from './theme-switch';

const navigation = [
  { name: '支払い', href: '/payments' },
  { name: '継続課金', href: '/subscriptions' },
  { name: 'CtoC', href: '/connect' },
  { name: 'カスタマーポータル', href: '/customer-portal' },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

const Layout: FC = ({ children }) => {
  const router = useRouter();

  const isCurrent = (item: typeof navigation[number]) => {
    return item.href === router.pathname;
  };

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-indigo-600 dark:bg-slate-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0 flex items-center space-x-2 text-white">
                    <Stripe />
                    <span className="font-bold">Tutorial</span>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            isCurrent(item)
                              ? 'bg-indigo-700 text-white'
                              : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={isCurrent(item) ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex space-x-4 items-center md:ml-6">
                    <ThemeSwitch />
                    <a
                      href="https://github.com/flock-team/stripe-doc"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Github className="text-indigo-200" />
                    </a>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      isCurrent(item)
                        ? 'bg-indigo-700 text-white'
                        : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={isCurrent(item) ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-indigo-700">
                <div className="flex items-center px-5">
                  {/* <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium text-indigo-300">
                        {user.email}
                      </div>
                    </div> */}
                  <button
                    type="button"
                    className="ml-auto bg-indigo-600 flex-shrink-0 p-1 rounded-full text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <header className="bg-gray-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-10 flex items-center">
            <a
              href=""
              target="_blank"
              className="aspect-video bg-slate-800 flex items-center justify-center rounded-lg w-96 mr-10 shadow-lg hover:shadow-xl transition-shadow"
            >
              <PlayIcon className="w-20 h-20 text-gray-300 opacity-40" />
            </a>
            <div className="flex-1">
              <h1 className="text-lg leading-6 font-semibold text-gray-900 mb-2">
                支払い
              </h1>
              <p className="text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est
                accusantium fugiat distinctio, deleniti veritatis expedita nulla
                veniam sed aspernatur quam nisi! Commodi accusantium consequatur
                quod tempora quis aliquid a ducimus!
              </p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a
              href="https://twitter.com/d151005"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" aria-hidden="true" />
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2022 nino.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
